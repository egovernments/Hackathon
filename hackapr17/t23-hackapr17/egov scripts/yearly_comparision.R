#Import Libraries
library(readxl)
library(data.table)
library(xlsx)
library(plotly)


merged_dataset_10<-merged_dataset[!(grepl("\\.",merged_dataset$`Complaint Date`)),]
print(merged_dataset_10)
testLines <- c("Absenteesim of sweepers")

merged_dataset_2<-merged_dataset_10[(grepl(testLines,merged_dataset_10$`Complaint Type`)),]
print(merged_dataset_2)

#2010
merged_dataset_2010<-merged_dataset_2[(grepl("[0-9]{2}-[0-9]{2}-2010",merged_dataset_2$`Complaint Date`)),]
print(merged_dataset_2010)

#2011
merged_dataset_2011<-merged_dataset_2[(grepl("[0-9]{2}-[0-9]{2}-2011",merged_dataset_2$`Complaint Date`)),]
print(merged_dataset_2011)

#2012
merged_dataset_2012<-merged_dataset_2[(grepl("[0-9]{2}-[0-9]{2}-2012",merged_dataset_2$`Complaint Date`)),]
print(merged_dataset_2012)

#2013
merged_dataset_2013<-merged_dataset_2[(grepl("[0-9]{2}-[0-9]{2}-2013",merged_dataset_2$`Complaint Date`)),]
print(merged_dataset_2013)

#2014
merged_dataset_2014<-merged_dataset_2[(grepl("[0-9]{2}-[0-9]{2}-2014",merged_dataset_2$`Complaint Date`)),]
print(merged_dataset_2014)

#2015
merged_dataset_2015<-merged_dataset_2[(grepl("[0-9]{2}-[0-9]{2}-2015",merged_dataset_2$`Complaint Date`)),]
print(merged_dataset_2015)

#2016
merged_dataset_2016<-merged_dataset_2[(grepl("[0-9]{2}-[0-9]{2}-2016",merged_dataset_2$`Complaint Date`)),]
print(merged_dataset_2016)

#2010
len_2010<-0
merged_dataset_3_2010<-strsplit(merged_dataset_2010$`Complaint Date`, "-")
print(merged_dataset_3_2010)
len_2010<-length(merged_dataset_3_2010)
print(len_2010)

print(merged_dataset_2011)
#2011
merged_dataset_3_2011<-strsplit(merged_dataset_2011$`Complaint Date`, "-")
print(merged_dataset_3_2011)
len_2011<-length(merged_dataset_3_2011)
print(len_2011)

#2012
merged_dataset_3_2012<-strsplit(merged_dataset_2012$`Complaint Date`, "-")
len_2012<-length(merged_dataset_3_2012)
print(len_2012)

#2013
merged_dataset_3_2013<-strsplit(merged_dataset_2013$`Complaint Date`, "-")
len_2013<-length(merged_dataset_3_2013)


#2014
merged_dataset_3_2014<-strsplit(merged_dataset_2014$`Complaint Date`, "-")
len_2014<-length(merged_dataset_3_2014)


#2015
merged_dataset_3_2015<-strsplit(merged_dataset_2015$`Complaint Date`, "-")
len_2015<-length(merged_dataset_3_2015)


#2016
merged_dataset_3_2016<-strsplit(merged_dataset_2016$`Complaint Date`, "-")
len_2016<-length(merged_dataset_3_2016)
print(len_2016)

merged_dataset_4_2010<-0
merged_dataset_4_2011<-0
merged_dataset_4_2012<-0
merged_dataset_4_2013<-0
merged_dataset_4_2014<-0
merged_dataset_4_2015<-0
merged_dataset_4_2016<-0

for(i in 1:len_2010)
{
  merged_dataset_4_2010[i]<- merged_dataset_3_2010[[i]][[3]]
}
print(merged_dataset_4_2010)

for(i in 1:len_2011)
{
  merged_dataset_4_2011[i]<- merged_dataset_3_2011[[i]][[3]]
}


for(i in 1:len_2012)
{
  merged_dataset_4_2012[i]<- merged_dataset_3_2012[[i]][[3]]
}
print(merged_dataset_4_2012)


for(i in 1:len_2013)
{
  merged_dataset_4_2013[i]<- merged_dataset_3_2013[[i]][[3]]
}


for(i in 1:len_2014)
{
  merged_dataset_4_2014[i]<- merged_dataset_3_2014[[i]][[3]]
}


for(i in 1:len_2015)
{
  merged_dataset_4_2015[i]<- merged_dataset_3_2015[[i]][[3]]
}


for(i in 1:len_2016)
{
  merged_dataset_4_2016[i]<- merged_dataset_3_2016[[i]][[3]]
}


month_2010<-0
for(k in 1:len_2010)
{
  #merged_dataset_4[i]<- c(merged_dataset_4,merged_dataset_3[[i]][[3]])
  month_2010[k]<- merged_dataset_3_2010[[k]][[1]]
  #print(i)
}
print(month_2010)
month_freq_2010<-as.data.frame(table(month_2010))

print(month_freq_2010)


x_month_2010 <- (month_freq_2010$month)
y_month_2010 <- (month_freq_2010$Freq)
print(x_month_2010)
print(y_month_2010)


  month_2011<-0
for(k in 1:len_2011)
{
  #merged_dataset_4[i]<- c(merged_dataset_4,merged_dataset_3[[i]][[3]])
  month_2011[k]<- merged_dataset_3_2011[[k]][[1]]
  #print(i)
}
print(month_2011)
month_freq_2011<-as.data.frame(table(month_2011))

print(month_freq_2011)


x_month_2011 <- (month_freq_2011$month)
y_month_2011 <- (month_freq_2011$Freq)
print(x_month_2011)
print(y_month_2011)

  month_2012<-0
for(k in 1:len_2012)
{
  #merged_dataset_4[i]<- c(merged_dataset_4,merged_dataset_3[[i]][[3]])
  month_2012[k]<- merged_dataset_3_2012[[k]][[1]]
  #print(i)
}
print(month_2012)
month_freq_2012<-as.data.frame(table(month_2012))

print(month_freq_2012)


x_month_2012 <- (month_freq_2012$month)
y_month_2012 <- (month_freq_2012$Freq)
print(x_month_2012)
print(y_month_2012)


month_2013<-0
for(k in 1:len_2013)
{
  #merged_dataset_4[i]<- c(merged_dataset_4,merged_dataset_3[[i]][[3]])
  month_2013[k]<- merged_dataset_3_2013[[k]][[1]]
  #print(i)
}
print(month_2013)
month_freq_2013<-as.data.frame(table(month_2013))

print(month_freq_2013)


x_month_2013 <- (month_freq_2013$month)
y_month_2013 <- (month_freq_2013$Freq)
print(x_month_2013)
print(y_month_2013)


  month_2014<-0
for(k in 1:len_2014)
{
  #merged_dataset_4[i]<- c(merged_dataset_4,merged_dataset_3[[i]][[3]])
  month_2014[k]<- merged_dataset_3_2014[[k]][[1]]
  #print(i)
}
print(month_2014)
month_freq_2014<-as.data.frame(table(month_2014))

print(month_freq_2014)


x_month_2014 <- (month_freq_2014$month)
y_month_2014 <- (month_freq_2014$Freq)
print(x_month_2014)
print(y_month_2014)


  month_2015<-0
for(k in 1:len_2015)
{
  #merged_dataset_4[i]<- c(merged_dataset_4,merged_dataset_3[[i]][[3]])
  month_2015[k]<- merged_dataset_3_2015[[k]][[1]]
  #print(i)
}name='2014'
print(month_2015)
month_freq_2015<-as.data.frame(table(month_2015))

print(month_freq_2015)


x_month_2015 <- (month_freq_2015$month)
y_month_2015 <- (month_freq_2015$Freq)
print(x_month_2015)
print(y_month_2015)


  month_2016<-0
for(k in 1:len_2016)
{
  #merged_dataset_4[i]<- c(merged_dataset_4,merged_dataset_3[[i]][[3]])
  month_2016[k]<- merged_dataset_3_2016[[k]][[1]]
  #print(i)
}
print(month_2016)
month_freq_2016<-as.data.frame(table(month_2016))

print(month_freq_2016)


x_month_2016 <- (month_freq_2016$month)
y_month_2016 <- (month_freq_2016$Freq)
print(x_month_2016)
print(y_month_2016)

p <- plot_ly(
  x = x_month_2012,
  y = y_month_2012,
  name = "2014",
  type = "scatter",
  mode="lines"
)%>%
#add_trace(x=x_month_2011,y =y_month_2011,name='2011',mode = 'lines')%>%
#add_trace(x=x_month_2012,y =y_month_2012,name='2012',mode = 'lines')%>%
add_trace(x=x_month_2013,y =y_month_2013,name='2013',mode = 'lines')%>%
add_trace(x=x_month_2014,y =y_month_2014,name='2014',mode = 'lines')%>%
add_trace(x=x_month_2015,y =y_month_2015,name='2015',mode = 'lines')%>%
add_trace(x=x_month_2016,y =y_month_2016,name='2016',mode = 'lines')%>%  

print (p)
