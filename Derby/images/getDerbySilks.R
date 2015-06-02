# Runner Silks

library(rvest)

# Timeform URL
tf_url <- "https://www.timeform.com/racing/RaceCard/Race/2015-06-06/16/5"

# read page
doc <- html(tf_url)

# silk urls
silks <- doc %>% 
    html_nodes(css = ".silksImg") %>%
    html_attr("src")

# runners
runners <- doc %>%
    html_nodes(css = "#raceCardEntries strong") %>%
    html_text() %>%
    stringr::str_replace_all(" \\([[:alpha:]]{2,3}\\)", "") %>%
    stringr::str_replace_all("\\s+", "-") %>%
    tolower() %>%
    paste0(".png")

for(silk in 1:length(silks)) {
    download.file(url = silks[silk], destfile = runners[silk], mode = "wb")
}