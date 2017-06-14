library(plotly)
xLabel<-(as.character(unique(unlist(m$`Complaint Type`))))
yLabel<-c()
for (i in xLabel){
  yLabel<-c(yLabel,(length(m$`Complaint Type`[m$`Complaint Type` == i])))
}

p <- plot_ly(data, x = xLabel, y = yLabel, type = 'bar', 
             marker = list(color = 'rgb(158,202,225)',
                           line = list(color = 'rgb(8,48,107)',
                                       width = 1.5))) %>%
  layout(title = "Complaints Type vs Frequency",
         xaxis = list(title = "Complaint Type"),
         yaxis = list(title = "Frequency of Complaints"))


print (p)
