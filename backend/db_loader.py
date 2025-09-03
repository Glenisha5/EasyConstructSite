import sqlite3
import pandas as pd

df = pd.read_csv('justdial_shops.csv')
conn = sqlite3.connect('shops.db')
df.to_sql('shops', conn, if_exists='replace', index=False)
conn.close()
