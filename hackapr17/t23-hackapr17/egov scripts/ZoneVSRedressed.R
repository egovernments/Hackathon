zone1table=m[(m$Zone.x=="N01"),]
zone1freq<-as.data.frame(table(zone1table$`Is Complaint Redressed?`))
print (zone1freq)
#sumzone1=sum(as.numeric((zone1freq$`Is Complaint Redressed?`)))
sumzone1=sum(zone1freq$`Freq`)
print (sumzone1)

redressedzone1=((zone1freq[(zone1freq$Var1=="YES"),]$`Freq`)/(sumzone1))
print (redressedzone1)
df=NULL
df=data.table(x,y)
df=rbind(df,list("N01",redressedzone1))

zone2table=m[(m$Zone.x=="N02"),]
zone2freq<-as.data.frame(table(zone2table$`Is Complaint Redressed?`))
print (zone2freq)
#sumzone1=sum(as.numeric((zone1freq$`Is Complaint Redressed?`)))
sumzone2=sum(zone2freq$`Freq`)
print (sumzone2)

redressedzone2=(zone2freq[(zone2freq$Var1=="YES"),]$`Freq`)/(sumzone2)
print (redressedzone2)
df=rbind(df,list("N02",redressedzone2))
zone3table=m[(m$Zone.x=="N03"),]
zone3freq<-as.data.frame(table(zone3table$`Is Complaint Redressed?`))
print (zone3freq)
#sumzone1=sum(as.numeric((zone1freq$`Is Complaint Redressed?`)))
sumzone3=sum(zone3freq$`Freq`)
print (sumzone3)

redressedzone3=(zone3freq[(zone3freq$Var1=="YES"),]$`Freq`)/(sumzone3)
print (redressedzone3)
df=rbind(df,list("N03",redressedzone3))


zone4table=m[(m$Zone.x=="N04"),]
zone4freq<-as.data.frame(table(zone4table$`Is Complaint Redressed?`))
print (zone4freq)
#sumzone1=sum(as.numeric((zone1freq$`Is Complaint Redressed?`)))
sumzone4=sum(zone4freq$`Freq`)
print (sumzone4)

redressedzone4=(zone4freq[(zone4freq$Var1=="YES"),]$`Freq`)/(sumzone4)
print (redressedzone4)
df=rbind(df,list("N04",redressedzone4))

zone5table=m[(m$Zone.x=="N05"),]
zone5freq<-as.data.frame(table(zone5table$`Is Complaint Redressed?`))
print (zone5freq)
#sumzone1=sum(as.numeric((zone1freq$`Is Complaint Redressed?`)))
sumzone5=sum(zone5freq$`Freq`)
print (sumzone5)

redressedzone5=(zone5freq[(zone5freq$Var1=="YES"),]$`Freq`)/(sumzone5)
print (redressedzone5)
df=rbind(df,list("N05",redressedzone5))

zone6table=m[(m$Zone.x=="N06"),]
zone6freq<-as.data.frame(table(zone6table$`Is Complaint Redressed?`))
print (zone6freq)
#sumzone1=sum(as.numeric((zone1freq$`Is Complaint Redressed?`)))
sumzone6=sum(zone6freq$`Freq`)
print (sumzone6)

redressedzone6=(zone6freq[(zone6freq$Var1=="YES"),]$`Freq`)/(sumzone6)
print (redressedzone6)
df=rbind(df,list("N06",redressedzone6))



zone7table=m[(m$Zone.x=="N07"),]
zone7freq<-as.data.frame(table(zone7table$`Is Complaint Redressed?`))
print (zone7freq)
#sumzone1=sum(as.numeric((zone1freq$`Is Complaint Redressed?`)))
sumzone7=sum(zone7freq$`Freq`)
print (sumzone7)

redressedzone7=(zone7freq[(zone7freq$Var1=="YES"),]$`Freq`)/(sumzone7)
print (redressedzone7)
df=rbind(df,list("N07",redressedzone7))


zone8table=m[(m$Zone.x=="N08"),]
zone8freq<-as.data.frame(table(zone8table$`Is Complaint Redressed?`))
print (zone8freq)
#sumzone1=sum(as.numeric((zone1freq$`Is Complaint Redressed?`)))
sumzone8=sum(zone8freq$`Freq`)
print (sumzone8)

redressedzone8=(zone8freq[(zone6freq$Var1=="YES"),]$`Freq`)/(sumzone8)
print (redressedzone8)
df=rbind(df,list("N08",redressedzone8))



zone9table=m[(m$Zone.x=="N09"),]
zone9freq<-as.data.frame(table(zone9table$`Is Complaint Redressed?`))
print (zone9freq)
#sumzone1=sum(as.numeric((zone1freq$`Is Complaint Redressed?`)))
sumzone9=sum(zone9freq$`Freq`)
print (sumzone9)

redressedzone9=(zone9freq[(zone9freq$Var1=="YES"),]$`Freq`)/(sumzone9)
print (redressedzone9)
df=rbind(df,list("N09",redressedzone9))



zone10table=m[(m$Zone.x=="N10"),]
zone10freq<-as.data.frame(table(zone10table$`Is Complaint Redressed?`))
print (zone10freq)
#sumzone1=sum(as.numeric((zone1freq$`Is Complaint Redressed?`)))
sumzone10=sum(zone10freq$`Freq`)
print (sumzone10)

redressedzone10=(zone10freq[(zone10freq$Var1=="YES"),]$`Freq`)/(sumzone10)
print (redressedzone10)
df=rbind(df,list("N10",redressedzone10))


zone11table=m[(m$Zone.x=="N11"),]
zone11freq<-as.data.frame(table(zone11table$`Is Complaint Redressed?`))
print (zone11freq)
#sumzone1=sum(as.numeric((zone1freq$`Is Complaint Redressed?`)))
sumzone11=sum(zone11freq$`Freq`)
print (sumzone11)

redressedzone11=(zone11freq[(zone11freq$Var1=="YES"),]$`Freq`)/(sumzone11)
print (redressedzone11)
df=rbind(df,list("N11",redressedzone11))


zone12table=m[(m$Zone.x=="N12"),]
zone12freq<-as.data.frame(table(zone12table$`Is Complaint Redressed?`))
print (zone12freq)
#sumzone1=sum(as.numeric((zone1freq$`Is Complaint Redressed?`)))
sumzone12=sum(zone12freq$`Freq`)
print (sumzone12)

redressedzone12=(zone12freq[(zone12freq$Var1=="YES"),]$`Freq`)/(sumzone12)
print (redressedzone12)
df=rbind(df,list("N12",redressedzone12))


zone13table=m[(m$Zone.x=="N13"),]
zone13freq<-as.data.frame(table(zone13table$`Is Complaint Redressed?`))
print (zone13freq)
#sumzone1=sum(as.numeric((zone1freq$`Is Complaint Redressed?`)))
sumzone13=sum(zone13freq$`Freq`)
print (sumzone13)

redressedzone13=(zone13freq[(zone13freq$Var1=="YES"),]$`Freq`)/(sumzone13)
print (redressedzone13)
df=rbind(df,list("N13",redressedzone13))


zone14table=m[(m$Zone.x=="N14"),]
zone14freq<-as.data.frame(table(zone14table$`Is Complaint Redressed?`))
print (zone14freq)
#sumzone1=sum(as.numeric((zone1freq$`Is Complaint Redressed?`)))
sumzone14=sum(zone14freq$`Freq`)
print (sumzone14)

redressedzone14=(zone6freq[(zone14freq$Var1=="YES"),]$`Freq`)/(sumzone14)
print (redressedzone14)

df=rbind(df,list("N014",redressedzone14))


zone15table=m[(m$Zone.x=="N15"),]
zone15freq<-as.data.frame(table(zone15table$`Is Complaint Redressed?`))
print (zone15freq)
#sumzone1=sum(as.numeric((zone1freq$`Is Complaint Redressed?`)))
sumzone15=sum(zone15freq$`Freq`)
print (sumzone15)

redressedzone15=(zone15freq[(zone15freq$Var1=="YES"),]$`Freq`)/(sumzone15)
print (redressedzone15)
df=rbind(df,list("N015",redressedzone15))

print (df)
p2 <- plot_ly(
  x = df$x[23:37],
  y = df$y[23:37],
  name = "Zone vs Redressed Complaint",
  type = "bar"
) %>%
  layout(title = 'Zone vs Redressed Complaint',
         xaxis = list(title = "Zone"),
         yaxis = list(title = " Redressed Complaint Count"))
print (p2)
