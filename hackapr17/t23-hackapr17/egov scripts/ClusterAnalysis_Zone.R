
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

newdf<-data.frame(x=m_temp$Zone.x,y=df_date)
print (newdf)

zone<- (unique(m_temp$Zone.x))
z1=0
z2=0
z3=0
z4=0
z5=0
z6=0
z7=0
z8=0
z9=0
z10=0
z11=0
z12=0
z13=0
z14=0
z15=0
c1=0
c2=0
c3=0
c4=0
c5=0
c6=0
c7=0
c8=0
c9=0
c10=0
c11=0
c12=0
c13=0
c14=0
c15=0

for(i in 1:len){
  if(newdf$x[i]==zone[1])
  {
    c1<-c1+1 
    z1<-z1+newdf$y[i]
  }else if(newdf$x[i]==zone[2])
  {
    c2<-c2+1 
    z2<-z2+newdf$y[i]
  }else if(newdf$x[i]==zone[3])
  {
    c3<-c3+1 
    z3<-z3+newdf$y[i]
  }else if(newdf$x[i]==zone[4])
  {
    c4<-c4+1 
    z4<-z4+newdf$y[i]
  }else if(newdf$x[i]==zone[5])
  {
    c5<-c5+1 
    z5<-z5+newdf$y[i]
  }else if(newdf$x[i]==zone[6])
  {
    c6<-c6+1 
    z6<-z6+newdf$y[i]
  }else if(newdf$x[i]==zone[7])
  {
    c7<-c7+1 
    z7<-z7+newdf$y[i]
  }else if(newdf$x[i]==zone[8])
  {
    c8<-c8+1 
    z8<-z8+newdf$y[i]
  }else if(newdf$x[i]==zone[9])
  {
    c9<-c9+1 
    z9<-z9+newdf$y[i]
  }else if(newdf$x[i]==zone[10])
  {
    c10<-c10+1 
    z10<-z10+newdf$y[i]
  }else if(newdf$x[i]==zone[11])
  {
    c11<-c11+1 
    z11<-z11+newdf$y[i]
  }else if(newdf$x[i]==zone[12])
  {
    c12<-c12+1 
    z12<-z12+newdf$y[i]
  }else if(newdf$x[i]==zone[13])
  {
    c13<-c13+1 
    z13<-z13+newdf$y[i]
  }else if(newdf$x[i]==zone[14])
  {
    c14<-c14+1 
    z14<-z14+newdf$y[i]
  }else {
    c15<-c15+1 
    z15<-z15+newdf$y[i]
  }
  }

avg1=z1/c1
avg2=z2/c2
avg3=z3/c3
avg4=z4/c4
avg5=z5/c5
avg6=z6/c6
avg7=z7/c7
avg8=z8/c8
avg9=z9/c9
avg10=z10/c10
avg11=z11/c11
avg12=z12/c12
avg13=z13/c13
avg14=z14/c14
avg15=z15/c15

p2 <- plot_ly(
  x = c(avg1, avg2, avg3,avg4, avg5, avg6,avg7, avg8, avg9,avg10, avg11, avg12,avg13,avg14,avg15),
  y = c(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15),
  name = "Avg Time Taken for complaint resolution vs Complaint Count",
  type = "scatter"
) %>%
  layout(title = 'Avg Time Taken for complaint resolution vs Complaint Count',
         xaxis = list(title = "Avg Time Taken for complaint resolution"),
         yaxis = list(title = " Complaint Count"))
print (p2)

Cluster_df<-data.frame(Avg_Resolution_Time=c(avg1, avg2, avg3,avg4, avg5, avg6,avg7, avg8, avg9,avg10, avg11, avg12,avg13,avg14,avg15),Num_Complaints=c(c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11,c12,c13,c14,c15))
print (Cluster_df)
set.seed(50)
Extracted_Cluster <- kmeans(Cluster_df, 2, nstart = 30)
Extracted_Cluster

Extracted_Cluster$cluster <- as.factor(Extracted_Cluster$cluster)
ggplot(Cluster_df, aes(Avg_Resolution_Time, Num_Complaints, color = Extracted_Cluster$cluster)) + geom_point()