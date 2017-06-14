

m_temp<-m[!(grepl("\\.",m$`Complaint Date`)),]
m_temp<-m_temp[!(grepl("\\.",m_temp$`Complaint Resolution Date`)),]
m_temp<-m_temp[!is.na(m_temp$`Complaint Date`),]
m_temp<-m_temp[!is.na(m_temp$`Complaint Resolution Date`),]

time_compl_3<-strsplit(m_temp$`Complaint Date`, "-")
print(time_compl_3)

len<-length(time_compl_3)
print(len)
merged_dataset_4<-0
for(i in 1:len)
{
  merged_dataset_4[i]<- time_compl_3[[i]][[3]]
  print (i)
}
print(merged_dataset_4)
merged_dataset_4<-strsplit(merged_dataset_4, " ")
print(merged_dataset_4)
year<-0
len2<-length(merged_dataset_4)
for(j in 1:len2)
{
  year[j]<- merged_dataset_4[[j]][[1]]
}
print(year)


time_compl_32<-strsplit(m_temp$`Complaint Resolution Date`, "-")
print(time_compl_32)

len2<-length(time_compl_32)
print(len2)
merged_dataset_42<-0
for(i in 1:len2)
{
  merged_dataset_42[i]<- time_compl_32[[i]][[3]]
  print (i)
}
print(merged_dataset_42)
merged_dataset_42<-strsplit(merged_dataset_42, " ")
print(merged_dataset_42)
year2<-0
len2<-length(merged_dataset_42)
for(j in 1:len2)
{
  year2[j]<- merged_dataset_42[[j]][[1]]
}
print(year2)


df_date <- NULL
for(i in 1:len)
{
df <- data.frame( Month = time_compl_3[[i]][[1]] , Day = time_compl_3[[i]][[2]],Year=year[i]  )
cols <- c( 'Month' , 'Day' , 'Year' )
x <- apply( df[ , cols ] , 1 , paste , collapse = "-" )
print (as.Date(x,"%m-%d-%Y"))

df2 <- data.frame( Month = time_compl_32[[i]][[1]] , Day = time_compl_32[[i]][[2]],Year=year2[i]  )
cols <- c( 'Month' , 'Day' , 'Year' )
x2 <- apply( df2[ , cols ] , 1 , paste , collapse = "-" )
print (as.Date(x2,"%m-%d-%Y"))

diff<-(as.Date(x,"%m-%d-%Y"))-(as.Date(x2,"%m-%d-%Y"))
df_date<-rbind(df_date,(abs(diff)))
}
print (df_date)

newdf<-data.frame(x=m_temp$`Guidance Value`,y=df_date)
print (newdf)

income1=0
c1=0
income2=0
c2=0
income3=0
c3=0
for(i in 1:len){
  if(newdf$x[i]<=1.0)
    {c1<-c1+1 
    income1<-income1+newdf$y[i]}
  else if(newdf$x[i]<=1.5){income2<-income2+newdf$y[i]
  c2<-c2+1}
  else {income3<-income3+newdf$y[i]
  c3<-c3+1
  }
}

avg1<-income1/c1
avg2<-income2/c2
avg3<-income3/c3

p2 <- plot_ly(
  x = c("Low Income", "Mid Income", "High Income"),
  y = c(avg1, avg2, avg3),
  name = "Income Group vs. Avg Time Taken for complaint resolution",
  type = "bar"
) %>%
  layout(title = 'Income Group vs. Average Time Taken for complaint resolution',
         xaxis = list(title = "Income Level"),
         yaxis = list(title = "Average Time Taken for complaint resolution"))
print (p2)




