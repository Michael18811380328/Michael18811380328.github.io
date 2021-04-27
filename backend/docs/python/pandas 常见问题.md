
# [安装pandas时出现环境错误](https://www.cnblogs.com/ConnorShip/p/9932438.html)

在安装pandas时出现Could not install packages due to an EnvironmentError
Consider using the `--user` option or check the permissions

**此时在install后面加--user即可**
**pip install --user pandas**

分类: [python数据分析](https://www.cnblogs.com/ConnorShip/category/1347491.html)


# ValueError: Length mismatch: Expected axis has 0 elements, new values have 2 elements

错误如下：
ValueError: Length mismatch: Expected axis has 0 elements, new values have 2 elements

代码：
~~~python
import pandas as pd

out_pred_rows = []

sub = pd.DataFrame(out_pred_rows)
sub.columns = ['ImageId', 'EncodedPixels']   # 如果out_pred_rows为空，则这句话会报错
sub = sub[sub.EncodedPixels.notnull()]
~~~

解决方案：
保证out_pred_rows不为空

原文链接：https://blog.csdn.net/wangdongwei0/article/details/83863533
