# 【解决】ValueError: Length mismatch: Expected axis has 0 elements, new values have 2 elements

错误如下：
ValueError: Length mismatch: Expected axis has 0 elements, new values have 2 elements

代码：

import pandas as pd

out_pred_rows = []

sub = pd.DataFrame(out_pred_rows)
sub.columns = ['ImageId', 'EncodedPixels']   # 如果out_pred_rows为空，则这句话会报错
sub = sub[sub.EncodedPixels.notnull()]
1
2
3
4
5
6
7
解决方案：
保证out_pred_rows不为空
————————————————
版权声明：本文为CSDN博主「懂懂懂懂懂懂懂」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/wangdongwei0/article/details/83863533