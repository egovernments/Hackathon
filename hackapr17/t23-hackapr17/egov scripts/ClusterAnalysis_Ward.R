'''
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
'''
newdf<-data.frame(x=m_temp$Ward.x,y=m_temp$`Time Taken for comlaint Redressal`)
print (newdf)

zone<- (unique(m_temp$Ward.x))
z<-matrix(0,length(zone))
c<-matrix(0,length(zone))

for(i in 1:len){
  for(j in 1:length(zone))
  if(newdf$x[i]==zone[j])
  {
    z[j]<-z[j]+newdf$y[i]
    c[j]<-c[j]+1
  }
}
print (length(c))

avg<-numz/c

print (avg)


ds<-data.frame(average=avg,count=c)

ggplot(ds, aes(average, count)) + geom_point()


Cluster_df<-data.frame(Avg_Resolution_Time=avg,Num_Complaints=c)
print (Cluster_df)
set.seed(50)
Extracted_Cluster <- kmeans(Cluster_df, 5, nstart = 30)
Extracted_Cluster

Extracted_Cluster$cluster <- as.factor(Extracted_Cluster$cluster)
ggplot(Cluster_df, aes(Avg_Resolution_Time, Num_Complaints, color = Extracted_Cluster$cluster)) + geom_point()