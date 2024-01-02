import requests

STOCK_BASE_URL = 'https://api.arvinx.com/api'

# 该脚本用于更新表格中关注的股票价格等信息。


def get_access_token():
    '''
    获取股票市场信息的入口token
    :return:
    '''
    res = requests.get("%s/stocks/token/" % STOCK_BASE_URL)
    if res.json().get('success'):
        return res.json().get('data', {}).get('token')
    return None


def get_stock_data_by_code(code, token=None):
    """
    :param code: 股票编码， 如'SZ002304'等
    :param token: 入口token
    :return: 返回相应的股票信息，包括当前价格，开盘价等
    """
    if token:
        price_url = "%s/stocks/%s?token=%s" % (STOCK_BASE_URL, code, token)
        res = requests.get(price_url)
        if res.json().get('success'):
            return res.json().get('data', None)
    return None


def get_stock_current_price(code, token=None):
    # 获取股票编码为code的当前股票价格
    stock_data = get_stock_data_by_code(code, token)
    if stock_data:
        return stock_data.get('current', None)
    return None


def update_stock_price(stock_code):
    # 更新base表格中的当前股价
    token = get_access_token()
    current_price = get_stock_current_price(stock_code, token)
    print("[Success]: %s 的价格为 %s" % (stock_code, current_price))


if __name__ == '__main__':
    # 洋河股份
    update_stock_price('SZ002304')
