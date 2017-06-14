library(readxl)
library(data.table)
library(plotly)
complaints <- data.table(read_excel('ComplaintData.xls', col_names = TRUE))
guidance <- data.table(read_excel('GuidanceValue.xls', col_names = TRUE))
guidance2<-guidance[!(guidance$Usage=="Non-Residential"),]
print (guidance2)

setkey(complaints,"Street Name")
setkey(guidance2,"Street")

m<-merge(complaints,guidance2, by.x = 'Street Name', by.y = 'Street', allow.cartesian = TRUE)

hist(m$`Guidance Value`, main="Relation b/w Complaints & Guidance Value", xlab="Guidance Value", ylab = "No. Of Complaints", border="blue", col="green")

p1 <- plot_ly(
  x = m$`Guidance Value`,
  name = "Income Group vs. Complaints",
  type = "histogram"
) %>%
  layout(title = 'Relation b/w Complaints & Guidance Value',
         xaxis = list(title = "Guidance Value"),
         yaxis = list(title = "No. Of Complaints"))
print (p1)

income1 <- m[(m$`Guidance Value` <= 1.0)]
income2 <- m[(m$`Guidance Value` > 1.0 & m$`Guidance Value` <= 1.5)]
income3 <- m[(m$`Guidance Value` > 1.5 & m$`Guidance Value` <= 2.0)]

p2 <- plot_ly(
  x = c("Low Income", "Mid Income", "High Income"),
  y = c(nrow(income1), nrow(income2), nrow(income3)),
  name = "Income Group vs. Complaints",
  type = "bar"
) %>%
  layout(title = 'Income Group vs. Complaints',
         xaxis = list(title = "Income Level"),
         yaxis = list(title = "No. Of Complaints"))
print (p2)

## 3 pie charts - one for each income group : giving the percentage of complaints of different types

p3 <- plot_ly(income1, labels = income1$`Complaint Type`, values = income1$`Sr. No`, type = 'pie') %>%
  layout(title = 'Complaint Types - Low Income Group',
         xaxis = list(showgrid = FALSE, zeroline = FALSE, showticklabels = FALSE),
         yaxis = list(showgrid = FALSE, zeroline = FALSE, showticklabels = FALSE))

print (p3)

p4 <- plot_ly(income1, labels = income1$`Complaint Type`, values = income1$`Sr. No`, type = 'pie') %>%
  layout(title = 'Complaint Types - Mid Income Group',
         xaxis = list(showgrid = FALSE, zeroline = FALSE, showticklabels = FALSE),
         yaxis = list(showgrid = FALSE, zeroline = FALSE, showticklabels = FALSE))

print (p4)

p5 <- plot_ly(income1, labels = income1$`Complaint Type`, values = income1$`Sr. No`, type = 'pie') %>%
  layout(title = 'Complaint Types - High Income Group',
         xaxis = list(showgrid = FALSE, zeroline = FALSE, showticklabels = FALSE),
         yaxis = list(showgrid = FALSE, zeroline = FALSE, showticklabels = FALSE))

print (p5)

zone_vals <- unique(c(as.character(m$Zone.x)))
total_types <- unique(c(as.character(m$`Complaint Type`)))
zone_vals <- sort(zone_vals)

for(i in 1:length(zone_vals)){
  zone <- m[(m$Zone.x == zone_vals[1])]
  zone_types <- unique(c(as.character(zone$`Complaint Type`)))
  x <- table(zone$`Complaint Type`)
  setdiff(total_types, zone_types)
}

with(m, table(Type_Of_Complaint= m$`Complaint Type`, Zone = m$Zone.x))

