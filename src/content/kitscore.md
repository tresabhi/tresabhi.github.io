---
draft: true
---

# KitScore

A scoring system for evaluating performance indirectly from adjacent files.

$$
K=2
$$

$$
A = \frac{
  \sum_{n=0}^N w_n a_n
}{
  \sum_{n=0}^N w_n
}
$$

$$
w_n = \left[ \sum_{m=0}^N R_{n ~ \leftrightarrow ~ m} \right]^{-1}
$$

$$
a_n = \sum_{k = 0}^K c_k x_n^k
$$
