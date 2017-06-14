#Import Libraries
library(readxl)
library(data.table)
library(xlsx)
library(plotly)
merged_dataset_2<-merged_dataset[!(grepl("\\.",merged_dataset$`Complaint Date`)),]
print(merged_dataset_2)

merged_dataset_3<-strsplit(merged_dataset_2$`Complaint Date`, "-")
len<-length(merged_dataset_3)
merged_dataset_4<-0
for(i in 1:len)
{
  #merged_dataset_4[i]<- c(merged_dataset_4,merged_dataset_3[[i]][[3]])
  merged_dataset_4[i]<- merged_dataset_3[[i]][[3]]
  #print(i)
}
merged_dataset_4<-strsplit(merged_dataset_4, " ")
print(merged_dataset_4)

year<-0
len2<-length(merged_dataset_4)
for(j in 1:len2)
{
  #merged_dataset_4[i]<- c(merged_dataset_4,merged_dataset_3[[i]][[3]])
  year[j]<- merged_dataset_4[[j]][[1]]
  #print(i)
}
print(year)


year_freq<-as.data.frame(table(year))
print(year_freq)

Number_of_Complaints_per_year <- (year_freq$year)
Year <- (year_freq$Freq)
print(x_year)
print(y_year)

#text <- c('27% market share', '24% market share', '19% market share')
data <- data.frame(Number_of_Complaints_per_year, Year)


p <- plot_ly(data, x = ~Number_of_Complaints_per_year, y = ~Year, type = 'bar', 
             marker = list(color = 'rgb(158,202,225)',
                           line = list(color = 'rgb(8,48,107)',
                                       width = 1.5)))%>%
  layout(title = "Year-Wise Complaints",
         xaxis = list(title = "Year"),
         yaxis = list(title = "Number of Complaints per year"))
print (p)





