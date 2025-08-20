# KitScore

A scoring system for evaluating performance indirectly from adjacent files.

## Sanitizing Data

Let $V$ represent a player state vector composed of $N$ statistics. These are the pieces of information representing the performance of a player.

$$
V =
\begin{bmatrix}
b_0 \\
b_1 \\
b_2 \\
\vdots
\end{bmatrix}
$$

For example, in World of Tanks Blitz, the API supplies a few key unique pieces of information that is available for all players and can be arranged into a state vector for each player.

$$
V =
\begin{bmatrix}
\text{battles} \\
\text{wins} \\
\text{damage} \\
\text{max\_damage} \\
\text{xp} \\
\vdots
\end{bmatrix}
$$

If your data is cumulative as is the case with World of Tanks Blitz where all statistics cumulate as the player plays more and more battles, normalize your data by the number of sessions or games.

$$
V =

\frac{1}{\text{battles}}

\begin{bmatrix}
\text{battles} \\
\text{wins} \\
\text{damage} \\
\text{max\_damage} \\
\text{xp} \\
\vdots
\end{bmatrix}

\implies

\begin{bmatrix}
\text{wins} \\
\text{damage} \\
\text{max\_damage} \\
\text{xp} \\
\vdots
\end{bmatrix}
$$

If your data contains historic data like in the case of World of Tanks Blitz where the max damage of a player is tracked which is not a cumulative statistic, cleanse your data by eliminating such rows. Furthermore, the method of collection for some statistics change over time and are not truly cumulative. For example, in World of Tanks Blitz, players reserve the ability to earn xp in game modes that don't increment any other statistics. These statistics should be removed from the data set too.

$$
V =

\begin{bmatrix}
\text{wins} \\
\text{damage} \\
\cancel{\text{max\_damage}} \\
\cancel{\text{xp}} \\
\vdots
\end{bmatrix}

\implies

\begin{bmatrix}
\text{wins} \\
\text{damage} \\
\vdots
\end{bmatrix}
$$

## Identifying Optimized Statistic

Now that $V$ contains a sanitized set of statistics, $b_0$ through $b_N$, we must identify what statistic we are trying to optimize. In World of Tanks Blitz for example, players aim to achieve the highest number of wins as possible. Thus, we will define $b_0$ as the optimization target and $b_0 \Leftrightarrow \text{wins}$ for our examples with World of Tanks Blitz.

> [!NOTE]
> Since $\text{wins}$, along with other statistics was normalized by $\text{battles}$, the interpretation of $b_0$ shifts from just the count of wins to the rate of wins. This will be referred to as "win rate", a percentage of games won.

## Collecting Data

It is important to collect all observations with the rules of elimination and sanitization consistently across all data points with the correct grouping.

In the case of World of Tanks Blitz, statistics collected with the intent of calculating the KitScore must be collected for all tanks individually. In other words, you may not collect state vectors for player profiles which cumulate statistics across all tanks. You must collect state vectors for each tank individually. KitScore analysis must be done separately for all tanks and then combined to calculate a single KitScore for the player.

In the end, we will end up with thousands of state vectors for each tank, contributed by many players.

## Corelating Data

After a sufficiently large pool of data has been collected, we must calculate polynomials of order $K$ that best corelate the statistics with one another. These coefficients can we wrapped by and represented cleanly as a vector $C$ of length $K + 1$. Use [the polynomial regression using least squares method](https://en.wikipedia.org/wiki/Polynomial_regression).

$$
C = \left[ c_0, c_1, c_2, \cdots, c_K \right]
$$

In the case of World of Tanks Blitz, you would plot the points of and calculate the polynomial of best fit for all combinations of statistics. Of course there is no point in creating polynomials for a statistic with itself (like $wins$ and $wins$), that would not contain any useful information.

|          | $wins$   | $damage$                                 | $kills$                                   | $spots$                                   | $\cdots$ |
| -------- | -------- | ---------------------------------------- | ----------------------------------------- | ----------------------------------------- | -------- |
| $wins$   | -        | $C_{\text{damage} \implies \text{wins}}$ | $C_{\text{kills} \implies \text{wins}}$   | $C_{\text{spots} \implies \text{wins}}$   | $\cdots$ |
| $damage$ | -        | -                                        | $C_{\text{kills} \implies \text{damage}}$ | $C_{\text{spots} \implies \text{damage}}$ | $\cdots$ |
| $kills$  | -        | -                                        | -                                         | $C_{\text{spots} \implies \text{kills}}$  | $\cdots$ |
| $spots$  | -        | -                                        | -                                         | -                                         | $\cdots$ |
| $\vdots$ | $\vdots$ | $\vdots$                                 | $\vdots$                                  | $\vdots$                                  | $\ddots$ |

> [!TIP]
> Make sure you make a wise decision on the degree of the polynomials. For World of Tanks Blitz, I recommend a degree of $K = 4$.

Once you have the corelation matrix corelating all statistics with one another, you can calculate the $R^2$ value for each statistic with one another using [the coefficient of determination method](https://en.wikipedia.org/wiki/Coefficient_of_determination). In the case of World of Tanks Blitz, the matrix for this will look identical to the one before but now with $R^2$ values and a diagonal of $1$.

|          | $wins$   | $damage$                                              | $kills$                                                | $spots$                                                | $\cdots$ |
| -------- | -------- | ----------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------ | -------- |
| $wins$   | $1$      | $R^2_{\text{damage} ~ \Leftrightarrow ~ \text{wins}}$ | $R^2_{\text{kills} ~ \Leftrightarrow ~ \text{wins}}$   | $R^2_{\text{spots} ~ \Leftrightarrow ~ \text{wins}}$   | $\cdots$ |
| $damage$ | -        | $1$                                                   | $R^2_{\text{kills} ~ \Leftrightarrow ~ \text{damage}}$ | $R^2_{\text{spots} ~ \Leftrightarrow ~ \text{damage}}$ | $\cdots$ |
| $kills$  | -        | -                                                     | $1$                                                    | $R^2_{\text{spots} ~ \Leftrightarrow ~ \text{kills}}$  | $\cdots$ |
| $spots$  | -        | -                                                     | -                                                      | $1$                                                    | $\cdots$ |
| $\vdots$ | $\vdots$ | $\vdots$                                              | $\vdots$                                               | $\vdots$                                               | $\ddots$ |

## Weights

Weights for the impact of statistics on $b_0$ can be calculated using the following equation. Here, $n$ is the statistic in question and $m$ is an iterator of all statistics including $n$ but excluding $b_0$ since that is the target statistic.

$$
w_n = \left[ \sum_{m = 1}^N R^2_{n ~ \Leftrightarrow ~ m} \right]^{-1}
$$

For example, in World of Tanks Blitz, the weight for $kills$ would follow this pattern:

$$
w_\text{kills} = \left[ R^2_{\text{kills} ~ \Leftrightarrow ~ \text{damage}} + R^2_{\text{kills} ~ \Leftrightarrow ~ \text{kills}} + R^2_{\text{kills} ~ \Leftrightarrow ~ \text{spots}} + \cdots \right]^{-1}
$$

Note that $R^2_{\text{kills} ~ \Leftrightarrow ~ \text{kills}}$ or any $R^2_{n ~ \Leftrightarrow ~ m}$ where $n = m$ will equal $1$.

$$
\begin{align*}

w_\text{kills} =& \left[ R^2_{\text{kills} ~ \Leftrightarrow ~ \text{damage}} + \cancel{R^2_{\text{kills} ~ \Leftrightarrow ~ \text{kills}}} + R^2_{\text{kills} ~ \Leftrightarrow ~ \text{spots}} + \cdots \right]^{-1} \\

=& \left[ R^2_{\text{kills} ~ \Leftrightarrow ~ \text{damage}} + 1 + R^2_{\text{kills} ~ \Leftrightarrow ~ \text{spots}} + \cdots \right]^{-1}

\end{align*}
$$

> [!TIP]
> Once you have your weights, you can safely discard the $R^2$ corelation matrix and all rows of the polynomial matrix but the once that corelate $b_0$ to the rest of the statistics. The one remaining row of coefficient and the weights is all the data you need to calculate KitScore.

$$
A = \frac{
  \sum_{n=0}^N w_n a_n
}{
  \sum_{n=0}^N w_n
}
$$

$$
w_n = \left[ \sum_{m=0}^N R_{n \implies m}^2 \right]^{-1}
$$

$$
a_n = \sum_{k = 0}^K c_k x_n^k
$$
