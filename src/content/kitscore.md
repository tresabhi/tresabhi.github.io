# KitScore

A scoring system for evaluating performance indirectly from adjacent files.

## High-Level Overview

The big idea behind KitScore is to predict the win rate of a player using all recorded statistics but the win rate itself. In other words, we will use kills, spots, damage, damage received, etc. to predict the win rate.

Training an AI model to do so would be the most accurate way to achieve, however, that will make it practically impossible to glean information from the data, loosing out on any opportunities to provide the player with useful feedback.

To resolve this, I developed and integrated KitScore into BlitzKit to not just predict the win rate to compare to the actual win rate, but also generate an arbitrary $[0, 200]$ score where $100$ represents the average player.

Loosely speaking, we start off by deciding what statistics we will be using to predict win rate. For World of Tanks Blitz, here are the statistics BlitzKit considers:

| Used | Name                     | Memo                                                                                                                             |
| ---- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| 🟢   | `battles`                | This will be used to normalize all other statistics.                                                                             |
| 🟢   | `capture_points`         | Cumulative.                                                                                                                      |
| 🟢   | `damage_dealt`           | Cumulative.                                                                                                                      |
| 🟢   | `damage_received`        | Cumulative.                                                                                                                      |
| 🟢   | `dropped_capture_points` | Cumulative.                                                                                                                      |
| 🟢   | `frags`                  | Cumulative.                                                                                                                      |
| 🔴   | `frags8p`                | Only applies to tanks of tier 8 or greater. Do not use.                                                                          |
| 🟢   | `hits`                   | Cumulative.                                                                                                                      |
| 🔴   | `losses`                 | Antonym of wins. This statistic's weight will end up being massive compared to all others and will overpower them.               |
| 🔴   | `max_frags`              | Not cumulative.                                                                                                                  |
| 🔴   | `max_xp`                 | Not cumulative.                                                                                                                  |
| 🟢   | `shots`                  | Cumulative.                                                                                                                      |
| 🟢   | `spotted`                | Cumulative.                                                                                                                      |
| 🟢   | `survived_battles`       | Cumulative.                                                                                                                      |
| 🔴   | `win_and_survived`       | Encodes the union of survival and winning. This will pollute the weights.                                                        |
| 🟢   | `wins`                   | The target statistic.                                                                                                            |
| 🔴   | `xp`                     | Encodes too much information about all other recorded statistics and increments in game modes even when others statistics don't. |

With a decent selection of usable statistics in mind, collect thousands of points of data of preexisting observations for each tank separately. In other words, simply scrape the Wargaming API, collecting player statistics on all tanks, grouped by tanks. In the end, your observations can be represented as a collection of vectors $V$ forming a matrix of size $N \times M$ where $N$ is the number of statistics and $M$ is the number of observations for each tank.

$$
\begin{bmatrix}
\text{battles} \\
\text{wins} \\
\text{damage\_dealt} \\
\text{frags} \\
\vdots
\end{bmatrix}

\implies

\begin{bmatrix}
21     & 4      & 73     & \cdots \\
10     & 0      & 29     & \cdots \\
42069  & 4311   & 131411 & \cdots \\
19     & 1      & 69     & \cdots \\
\vdots & \vdots & \vdots & \ddots
\end{bmatrix}
$$

Since statistics in World of Tanks Blitz are cumulative, normalize the data by the number of battles.

$$
\begin{bmatrix}
\text{wins} \\
\text{damage\_dealt} \\
\text{frags} \\
\vdots
\end{bmatrix}

\implies

\begin{bmatrix}
10 / 21    & 0 / 4    & 29 / 73     & \cdots \\
42069 / 21 & 4311 / 4 & 131411 / 73 & \cdots \\
19 / 21    & 1 / 4    & 69 / 73     & \cdots \\
\vdots     & \vdots   & \vdots      & \ddots
\end{bmatrix}

=

\begin{bmatrix}
0.5    & 0.0    & 0.4    & \cdots \\
2003.3 & 1077.8 & 1800.2 & \cdots \\
0.9    & 0.3    & 0.9    & \cdots \\
\vdots & \vdots & \vdots & \ddots
\end{bmatrix}
$$

With thousands, possibly even millions of observations, we can now construct polynomials of least squares to corelate all statistics with one another. It is helpful to construct a cohort table to visualize the data. In other words, we will plot each statistic to approximate all other statistics.

Use [the polynomial regression using least squares method](https://en.wikipedia.org/wiki/Polynomial_regression). For World of Tanks Blitz, I recommend a polynomial of order $K = 4$. Note that the diagonal where we compare statistics with itself is redundant, so feel free to omit it and assume a basic linear trend.

|              | wins                                                     | damage_dealt                                                     | frags                                              | spots                                              | $\cdots$ |
| ------------ | -------------------------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | -------- |
| wins         | ![wins to wins](https://i.imgur.com/d69IZLN.png)         | -                                                                | -                                                  | -                                                  | $\cdots$ |
| damage_dealt | ![damage_dealt to wins](https://i.imgur.com/P2pU3Ai.png) | ![damage_dealt to damage_dealt](https://i.imgur.com/d69IZLN.png) | -                                                  | -                                                  | $\cdots$ |
| frags        | ![frags to wins](https://i.imgur.com/KyjRIx5.png)        | ![frags to damage_dealt](https://i.imgur.com/riev1LB.png)        | ![frags to frags](https://i.imgur.com/d69IZLN.png) | -                                                  | $\cdots$ |
| spots        | ![spots to wins](https://i.imgur.com/KyjRIx5.png)        | ![spots to damage_dealt](https://i.imgur.com/hnM7YZk.png)        | ![spots to frags](https://i.imgur.com/hnM7YZk.png) | ![spots to spots](https://i.imgur.com/d69IZLN.png) | $\cdots$ |
| $\vdots$     | $\vdots$                                                 | $\vdots$                                                         | $\vdots$                                           | $\vdots$                                           | $\ddots$ |

## KitScore vs. WN8/WN7

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

## $b_0$ Approximation

When given a new observation (i.e. the observation you are trying to evaluate), each statistic, using its polynomial coefficients, approximates $b_0$. Here, $x_n$ is the statistic $n$ of the new observed state vector being judged.

$$
a_n = \sum_{k = 0}^K c_k x_n^k
$$

Once the atomic approximations have been calculated, you can calculate the anticipated value of $b_0$ using a weighted average.

$$
A = \frac{
 \sum_{n=0}^N w_n a_n
}{
 \sum_{n=0}^N w_n
}
$$
