import pandas as pd
import numpy as np
import plotly.plotly as py
import plotly.graph_objs as go

# Import data from csv
df = pd.read_csv('Complaint Data.csv')
df.head()

trace = go.Scatter(
                    x=df['Zone'], y=df['Complaint Type'], # Data
                    mode='lines'
                   )

# trace2 = go.Scatter(x=df['x'], y=df['sinx'], mode='lines', name='sinx' )
# trace3 = go.Scatter(x=df['x'], y=df['cosx'], mode='lines', name='cosx')

layout = go.Layout(title='Simple Plot from csv data',
                   plot_bgcolor='rgb(230, 230,230)')

fig = go.Figure(data=[trace], layout=layout)

# Plot data in the notebook
py.iplot(fig, filename='simple-plot-from-csv')