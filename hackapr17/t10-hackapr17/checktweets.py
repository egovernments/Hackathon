import json,requests,time

# import oauth2,json
#
# def oauth_req(url, key, secret, post_body, http_method="POST", http_headers=None):
#     consumer = oauth2.Consumer(key="nKttj8ZUWlod3oohcEg9HSu13", secret="nL9UomIsHNjSr2rAt7gxEzytCxnyty88domX8nk2iq2IZ0bnFa")
#     token = oauth2.Token(key=key, secret=secret)
#     client = oauth2.Client(consumer, token)
#     resp, content = client.request( url, method=http_method, body=post_body, headers=http_headers )
#     return content


url="https://api.twitter.com/1.1/search/tweets.json"
params = {}
headers={}
data={}
last_tweet_id=""
headers["Authorization"]="Bearer AAAAAAAAAAAAAAAAAAAAAM090AAAAAAAZsq5%2B5BikosZBTXtWtjXlup0QKk%3DW5HrKnv0qQ4NIHw4j6vzwrOiKERw6enZXSaJE6VDiYR2q6oATu"
params["q"]="%23egovcomplain"
params["result_type"]="recent"
while True:
    r = requests.get(url,params=params,headers=headers)
    try:
        status = r.json()["statuses"]
        last_tweet_id = status[0]["id_str"]
        print last_tweet_id
        for tweets in status:
            data["tweet_id"] = tweets["id_str"]
            data["tweet_text"] = tweets["text"]
            hashtags = []
            for htg in tweets["entities"]["hashtags"]:
                hashtags.append(htg["text"])
            data["hashtags"]=hashtags
            data["user_id"] = tweets["user"]["id_str"]
            data["user_name"]=tweets["user"]["name"]
            data["handle"]=tweets["user"]["screen_name"]
            try:
                data["user_lat"]=tweets["place"]["bounding_box"]["coordinates"][0][0][1]
            except:
                data["user_lat"]=None
            try:
                data["user_lon"]=tweets["place"]["bounding_box"]["coordinates"][0][0][0]
            except:
                data["user_lon"]=None
            #post_body = "status=@"+data["handle"]+" Please reply with your phone and email in Direct Message;in_reply_to_status_id="+data["tweet_id"]
            #post_body = "screen_name="+data["handle"]+";text=Please reply with your phone number and email"
            #print post_body
            #home_timeline = oauth_req( 'https://api.twitter.com/1.1/direct_messages/new.json', '855684964263763968-13BmzNiBuQfSb3sDUhHaUYdwPf402AR', 'igXKcJb2GwDQGOxAHzIHOwjDzqy1wFuwBFlVfLhInDSvV',post_body)
            print data
            req_url = "http://127.0.0.1:8000/api/send/"
            r = requests.post(req_url,data=data)
            print r.status_code
            params["since_id"]=last_tweet_id
    except:
        continue
    time.sleep(30)
