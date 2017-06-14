import oauth2,json,requests,time

def oauth_req(url, key, secret, post_body="", http_method="GET", http_headers=None):
    consumer = oauth2.Consumer(key="nKttj8ZUWlod3oohcEg9HSu13", secret="nL9UomIsHNjSr2rAt7gxEzytCxnyty88domX8nk2iq2IZ0bnFa")
    token = oauth2.Token(key=key, secret=secret)
    client = oauth2.Client(consumer, token)
    resp, content = client.request( url, method=http_method, body=post_body, headers=http_headers )
    return content

post_body=""
while True:
    print post_body
    try:
        if len(post_body)==0:
            home_timeline = oauth_req( 'https://api.twitter.com/1.1/direct_messages.json', '855684964263763968-13BmzNiBuQfSb3sDUhHaUYdwPf402AR', 'igXKcJb2GwDQGOxAHzIHOwjDzqy1wFuwBFlVfLhInDSvV' ,post_body)
        else:
            home_timeline = oauth_req( 'https://api.twitter.com/1.1/direct_messages.json?'+post_body, '855684964263763968-13BmzNiBuQfSb3sDUhHaUYdwPf402AR', 'igXKcJb2GwDQGOxAHzIHOwjDzqy1wFuwBFlVfLhInDSvV' )
        messages = json.loads(home_timeline)
        last_message = messages[0]["id_str"]
        print last_message
        for message in messages:
            data={}
            data["user_id"]=message["sender"]["id_str"]
            data["message"]=message["text"]
            data["handle"]=message["sender"]["screen_name"]
            req_url = "http://127.0.0.1:8000/api/view/"
            r = requests.post(req_url,data=data)
            print r.status_code
        post_body="since_id="+last_message
        print post_body
    except:
        pass
    time.sleep(30)
