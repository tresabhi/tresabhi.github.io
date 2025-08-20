---
draft: true
---

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

$$
K = 4
$$

$$
A = \frac{
  \sum_{n=0}^N w_n a_n
}{
  \sum_{n=0}^N w_n
}
$$

$$
w_n = \left[ \sum_{m=0}^N R_{n ~ \leftrightarrow ~ m}^2 \right]^{-1}
$$

$$
a_n = \sum_{k = 0}^K c_k x_n^k
$$
