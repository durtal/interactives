library(RcappeR)
library(dplyr)
library(jsonlite)

Oaks
tmp <- Oaks %>%
    mutate(c5f = conv_margins(btn_l = len5f, win_time = 72.36, conditions = "f-gq"),
           c8_5f = conv_margins(btn_l = len8_5f, win_time = 117.72, conditions = "f-gq"),
           c10f = conv_margins(btn_l = len10f, win_time = 134.04, conditions = "f-gq"),
           c11f = conv_margins(btn_l = len11f, win_time = 145.28, conditions = "f-gq"),
           c12f = conv_margins(btn_l = len12f, win_time = 157.41, conditions = "f-gq"),
           s5f = c5f,
           s8_5f = c8_5f - c5f,
           s10f = c10f - c8_5f,
           s11f = c11f - c10f,
           s12f = c12f - c11f,
           fs7f = fin_spd(fin_time = c12f, dist = 12, sect_time = c12f - c5f, sect_dist = 7),
           fs3_5f = fin_spd(fin_time = c12f, dist = 12, sect_time = c12f - c8_5f, sect_dist = 3.44),
           fs2f = fin_spd(fin_time = c12f, dist = 12, sect_time = c12f - c10f, sect_dist = 2),
           fs1f = fin_spd(fin_time = c12f, dist = 12, sect_time = c12f - c11f, sect_dist = 1),
           bl5f = btn_sec(c5f),
           bl8_5f = btn_sec(c8_5f),
           bl10f = btn_sec(c10f),
           bl11f = btn_sec(c11f),
           bl12f = btn_sec(c12f),
           p5f = rank(c5f, ties.method = "first"),
           p8_5f = rank(c8_5f, ties.method = "first"),
           p10f = rank(c10f, ties.method = "first"),
           p11f = rank(c11f, ties.method = "first"),
           p12f = rank(c12f, ties.method = "first"))

y <- plyr::dlply(tmp, "pos", as.list)
y <- unname(y)
write(x = toJSON(y, auto_unbox = T), file = "Oaks2015.json")
