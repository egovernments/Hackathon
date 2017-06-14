
colzone<-as.data.frame(table(merged_dataset$Zone.x))




library(plotly)

x <- colzone$Var1
y <- colzone$Freq
#text <- c('27% market share', '24% market share', '19% market share')
data <- data.frame(x, y)


p <- plot_ly(data, x = ~x, y = ~y, type = 'bar', 
             marker = list(color = 'rgb(158,202,225)',
                           line = list(color = 'rgb(8,48,107)',
                                       width = 1.5))) %>%
  layout(title = "Complaints Received Zone Wise",
         xaxis = list(title = ""),
         yaxis = list(title = "Frequency of Complaints"))


print (p)







