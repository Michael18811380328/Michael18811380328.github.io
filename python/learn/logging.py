# coding=utf-8
import logging
# logging
# 是python内置的输出日志的模块。相对于print，logging可以在不同版本中输入不同等级的日志，在调试输出大量日志，在release版本中输出较少日志；可以将日志输出到需要输出的地方

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
# logging.basicConfig(level = logging.DEBUG,format = '%(asctime)s - %(name)s - %(levelname)s - %(message)s')
# 基本配置（下面是debug模式）
logger = logging.getLogger(__name__)

logger.info("Start print log")
logger.debug("Do something")
logger.warning("Something maybe fail.")
logger.info("Finish")
# 运行程序可以看到输出的结果
# 同样可以把产生的日志写入某个文件中
