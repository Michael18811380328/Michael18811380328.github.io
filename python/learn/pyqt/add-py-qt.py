# coding=utf-8
# you should run this file use python3 env
class Ui_MainWindow(object):
    def __init__(self, s):
        self.s1 = s[0]
        self.s2 = s[1]
        if self.s1 == '1' and self.s2 == '+':
            self.s3 = 2
            self.s4 = '+'
            self.s5 = 9
        if self.s1 == '1' and self.s2 == '*':
            self.s3 = 2
            self.s4 = '×'
            self.s5 = 9
        if self.s1 == '2' and self.s2 == '*':
            self.s3 = 4
            self.s4 = '×'
            self.s5 = 99
        if self.s1 == '2' and self.s2 == '+':
            self.s3 = 3
            self.s4 = '+'
            self.s5 = 99

    def setupUi(self, MainWindow):
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(494, 629)
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            MainWindow.sizePolicy().hasHeightForWidth())
        MainWindow.setSizePolicy(sizePolicy)
        self.centralwidget = QtWidgets.QWidget(MainWindow)
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            self.centralwidget.sizePolicy().hasHeightForWidth())
        self.centralwidget.setSizePolicy(sizePolicy)
        self.centralwidget.setObjectName("centralwidget")
        self.LCD111 = QtWidgets.QLCDNumber(self.centralwidget)
        self.LCD111.setGeometry(QtCore.QRect(340, 20, 70, 60))
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            self.LCD111.sizePolicy().hasHeightForWidth())
        self.LCD111.setSizePolicy(sizePolicy)
        self.LCD111.setDigitCount(self.s3)
        self.LCD111.setObjectName("LCD111")
        self.label = QtWidgets.QLabel(self.centralwidget)
        self.label.setGeometry(QtCore.QRect(430, 20, 50, 60))
        font = QtGui.QFont()
        font.setPointSize(27)
        self.label.setFont(font)
        self.label.setObjectName("label")
        self.label_66 = QtWidgets.QLabel(self.centralwidget)
        self.label_66.setGeometry(QtCore.QRect(170, 110, 50, 60))
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            self.label_66.sizePolicy().hasHeightForWidth())
        self.label_66.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setPointSize(30)
        self.label_66.setFont(font)
        self.label_66.setAlignment(QtCore.Qt.AlignCenter)
        self.label_66.setObjectName("label_66")
        self.label_68 = QtWidgets.QLabel(self.centralwidget)
        self.label_68.setGeometry(QtCore.QRect(60, 110, 50, 60))
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            self.label_68.sizePolicy().hasHeightForWidth())
        self.label_68.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setPointSize(30)
        self.label_68.setFont(font)
        self.label_68.setAlignment(QtCore.Qt.AlignCenter)
        self.label_68.setObjectName("label_68")
        self.LCD22 = QtWidgets.QLCDNumber(self.centralwidget)
        self.LCD22.setGeometry(QtCore.QRect(110, 110, 50, 60))
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            self.LCD22.sizePolicy().hasHeightForWidth())
        self.LCD22.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setPointSize(16)
        self.LCD22.setFont(font)
        self.LCD22.setDigitCount(int(self.s1))
        self.LCD22.setObjectName("LCD22")
        self.LCD222 = QtWidgets.QLCDNumber(self.centralwidget)
        self.LCD222.setGeometry(QtCore.QRect(340, 110, 70, 60))
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            self.LCD222.sizePolicy().hasHeightForWidth())
        self.LCD222.setSizePolicy(sizePolicy)
        self.LCD222.setDigitCount(self.s3)
        self.LCD222.setObjectName("LCD222")
        self.lineEdit_6 = QtWidgets.QLineEdit(self.centralwidget)
        self.lineEdit_6.setGeometry(QtCore.QRect(230, 110, 100, 60))
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            self.lineEdit_6.sizePolicy().hasHeightForWidth())
        self.lineEdit_6.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setPointSize(16)
        font.setStyleStrategy(QtGui.QFont.PreferDefault)
        self.lineEdit_6.setFont(font)
        self.lineEdit_6.setInputMethodHints(QtCore.Qt.ImhDigitsOnly)
        self.lineEdit_6.setAlignment(QtCore.Qt.AlignCenter)
        self.lineEdit_6.setObjectName("lineEdit_6")
        self.label2 = QtWidgets.QLabel(self.centralwidget)
        self.label2.setGeometry(QtCore.QRect(430, 110, 50, 60))
        font = QtGui.QFont()
        font.setPointSize(27)
        self.label2.setFont(font)
        self.label2.setObjectName("label2")
        self.LCD2 = QtWidgets.QLCDNumber(self.centralwidget)
        self.LCD2.setGeometry(QtCore.QRect(10, 110, 50, 60))
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            self.LCD2.sizePolicy().hasHeightForWidth())
        self.LCD2.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setPointSize(16)
        self.LCD2.setFont(font)
        self.LCD2.setLayoutDirection(QtCore.Qt.LeftToRight)
        self.LCD2.setDigitCount(int(self.s1))
        self.LCD2.setObjectName("LCD2")
        self.label_70 = QtWidgets.QLabel(self.centralwidget)
        self.label_70.setGeometry(QtCore.QRect(170, 200, 50, 60))
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            self.label_70.sizePolicy().hasHeightForWidth())
        self.label_70.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setPointSize(30)
        self.label_70.setFont(font)
        self.label_70.setAlignment(QtCore.Qt.AlignCenter)
        self.label_70.setObjectName("label_70")
        self.label_71 = QtWidgets.QLabel(self.centralwidget)
        self.label_71.setGeometry(QtCore.QRect(60, 200, 50, 60))
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            self.label_71.sizePolicy().hasHeightForWidth())
        self.label_71.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setPointSize(30)
        self.label_71.setFont(font)
        self.label_71.setAlignment(QtCore.Qt.AlignCenter)
        self.label_71.setObjectName("label_71")
        self.LCD33 = QtWidgets.QLCDNumber(self.centralwidget)
        self.LCD33.setGeometry(QtCore.QRect(110, 200, 50, 60))
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            self.LCD33.sizePolicy().hasHeightForWidth())
        self.LCD33.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setPointSize(16)
        self.LCD33.setFont(font)
        self.LCD33.setDigitCount(int(self.s1))
        self.LCD33.setObjectName("LCD33")
        self.LCD333 = QtWidgets.QLCDNumber(self.centralwidget)
        self.LCD333.setGeometry(QtCore.QRect(340, 200, 70, 60))
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            self.LCD333.sizePolicy().hasHeightForWidth())
        self.LCD333.setSizePolicy(sizePolicy)
        self.LCD333.setDigitCount(self.s3)
        self.LCD333.setObjectName("LCD333")
        self.lineEdit3 = QtWidgets.QLineEdit(self.centralwidget)
        self.lineEdit3.setGeometry(QtCore.QRect(230, 200, 100, 60))
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            self.lineEdit3.sizePolicy().hasHeightForWidth())
        self.lineEdit3.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setPointSize(16)
        font.setStyleStrategy(QtGui.QFont.PreferDefault)
        self.lineEdit3.setFont(font)
        self.lineEdit3.setInputMethodHints(QtCore.Qt.ImhDigitsOnly)
        self.lineEdit3.setAlignment(QtCore.Qt.AlignCenter)
        self.lineEdit3.setObjectName("lineEdit3")
        self.label3 = QtWidgets.QLabel(self.centralwidget)
        self.label3.setGeometry(QtCore.QRect(430, 200, 50, 60))
        font = QtGui.QFont()
        font.setPointSize(27)
        self.label3.setFont(font)
        self.label3.setObjectName("label3")
        self.LCD3 = QtWidgets.QLCDNumber(self.centralwidget)
        self.LCD3.setGeometry(QtCore.QRect(10, 200, 50, 60))
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            self.LCD3.sizePolicy().hasHeightForWidth())
        self.LCD3.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setPointSize(16)
        self.LCD3.setFont(font)
        self.LCD3.setLayoutDirection(QtCore.Qt.LeftToRight)
        self.LCD3.setDigitCount(int(self.s1))
        self.LCD3.setObjectName("LCD3")
        self.label_73 = QtWidgets.QLabel(self.centralwidget)
        self.label_73.setGeometry(QtCore.QRect(170, 300, 50, 60))
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            self.label_73.sizePolicy().hasHeightForWidth())
        self.label_73.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setPointSize(30)
        self.label_73.setFont(font)
        self.label_73.setAlignment(QtCore.Qt.AlignCenter)
        self.label_73.setObjectName("label_73")
        self.label_74 = QtWidgets.QLabel(self.centralwidget)
        self.label_74.setGeometry(QtCore.QRect(60, 300, 50, 60))
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            self.label_74.sizePolicy().hasHeightForWidth())
        self.label_74.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setPointSize(30)
        self.label_74.setFont(font)
        self.label_74.setAlignment(QtCore.Qt.AlignCenter)
        self.label_74.setObjectName("label_74")
        self.LCD44 = QtWidgets.QLCDNumber(self.centralwidget)
        self.LCD44.setGeometry(QtCore.QRect(110, 300, 50, 60))
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            self.LCD44.sizePolicy().hasHeightForWidth())
        self.LCD44.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setPointSize(16)
        self.LCD44.setFont(font)
        self.LCD44.setDigitCount(int(self.s1))
        self.LCD44.setObjectName("LCD44")
        self.LCD444 = QtWidgets.QLCDNumber(self.centralwidget)
        self.LCD444.setGeometry(QtCore.QRect(340, 300, 70, 60))
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            self.LCD444.sizePolicy().hasHeightForWidth())
        self.LCD444.setSizePolicy(sizePolicy)
        self.LCD444.setDigitCount(self.s3)
        self.LCD444.setObjectName("LCD444")
        self.lineEdit4 = QtWidgets.QLineEdit(self.centralwidget)
        self.lineEdit4.setGeometry(QtCore.QRect(230, 300, 100, 60))
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            self.lineEdit4.sizePolicy().hasHeightForWidth())
        self.lineEdit4.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setPointSize(16)
        font.setStyleStrategy(QtGui.QFont.PreferDefault)
        self.lineEdit4.setFont(font)
        self.lineEdit4.setInputMethodHints(QtCore.Qt.ImhDigitsOnly)
        self.lineEdit4.setAlignment(QtCore.Qt.AlignCenter)
        self.lineEdit4.setObjectName("lineEdit4")
        self.label4 = QtWidgets.QLabel(self.centralwidget)
        self.label4.setGeometry(QtCore.QRect(430, 300, 50, 60))
        font = QtGui.QFont()
        font.setPointSize(27)
        self.label4.setFont(font)
        self.label4.setObjectName("label4")
        self.LCD4 = QtWidgets.QLCDNumber(self.centralwidget)
        self.LCD4.setGeometry(QtCore.QRect(10, 300, 50, 60))
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            self.LCD4.sizePolicy().hasHeightForWidth())
        self.LCD4.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setPointSize(16)
        self.LCD4.setFont(font)
        self.LCD4.setLayoutDirection(QtCore.Qt.LeftToRight)
        self.LCD4.setDigitCount(int(self.s1))
        self.LCD4.setObjectName("LCD4")
        self.label_76 = QtWidgets.QLabel(self.centralwidget)
        self.label_76.setGeometry(QtCore.QRect(170, 400, 50, 60))
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            self.label_76.sizePolicy().hasHeightForWidth())
        self.label_76.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setPointSize(30)
        self.label_76.setFont(font)
        self.label_76.setAlignment(QtCore.Qt.AlignCenter)
        self.label_76.setObjectName("label_76")
        self.label_77 = QtWidgets.QLabel(self.centralwidget)
        self.label_77.setGeometry(QtCore.QRect(60, 400, 50, 60))
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            self.label_77.sizePolicy().hasHeightForWidth())
        self.label_77.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setPointSize(30)
        self.label_77.setFont(font)
        self.label_77.setAlignment(QtCore.Qt.AlignCenter)
        self.label_77.setObjectName("label_77")
        self.LCD55 = QtWidgets.QLCDNumber(self.centralwidget)
        self.LCD55.setGeometry(QtCore.QRect(110, 400, 50, 60))
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            self.LCD55.sizePolicy().hasHeightForWidth())
        self.LCD55.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setPointSize(16)
        self.LCD55.setFont(font)
        self.LCD55.setDigitCount(int(self.s1))
        self.LCD55.setObjectName("LCD55")
        self.LCD555 = QtWidgets.QLCDNumber(self.centralwidget)
        self.LCD555.setGeometry(QtCore.QRect(340, 400, 70, 60))
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            self.LCD555.sizePolicy().hasHeightForWidth())
        self.LCD555.setSizePolicy(sizePolicy)
        self.LCD555.setDigitCount(self.s3)
        self.LCD555.setObjectName("LCD555")
        self.lineEdit5 = QtWidgets.QLineEdit(self.centralwidget)
        self.lineEdit5.setGeometry(QtCore.QRect(230, 400, 100, 60))
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            self.lineEdit5.sizePolicy().hasHeightForWidth())
        self.lineEdit5.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setPointSize(16)
        font.setStyleStrategy(QtGui.QFont.PreferDefault)
        self.lineEdit5.setFont(font)
        self.lineEdit5.setInputMethodHints(QtCore.Qt.ImhDigitsOnly)
        self.lineEdit5.setAlignment(QtCore.Qt.AlignCenter)
        self.lineEdit5.setObjectName("lineEdit5")
        self.label5 = QtWidgets.QLabel(self.centralwidget)
        self.label5.setGeometry(QtCore.QRect(430, 400, 50, 60))
        font = QtGui.QFont()
        font.setPointSize(27)
        self.label5.setFont(font)
        self.label5.setObjectName("label5")
        self.LCD5 = QtWidgets.QLCDNumber(self.centralwidget)
        self.LCD5.setGeometry(QtCore.QRect(10, 400, 50, 60))
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            self.LCD5.sizePolicy().hasHeightForWidth())
        self.LCD5.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setPointSize(16)
        self.LCD5.setFont(font)
        self.LCD5.setLayoutDirection(QtCore.Qt.LeftToRight)
        self.LCD5.setDigitCount(int(self.s1))
        self.LCD5.setObjectName("LCD5")
        self.label_44 = QtWidgets.QLabel(self.centralwidget)
        self.label_44.setGeometry(QtCore.QRect(170, 20, 50, 60))
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            self.label_44.sizePolicy().hasHeightForWidth())
        self.label_44.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setPointSize(30)
        self.label_44.setFont(font)
        self.label_44.setAlignment(QtCore.Qt.AlignCenter)
        self.label_44.setObjectName("label_44")
        self.label_43 = QtWidgets.QLabel(self.centralwidget)
        self.label_43.setGeometry(QtCore.QRect(60, 20, 50, 60))
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            self.label_43.sizePolicy().hasHeightForWidth())
        self.label_43.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setPointSize(30)
        self.label_43.setFont(font)
        self.label_43.setAlignment(QtCore.Qt.AlignCenter)
        self.label_43.setObjectName("label_43")
        self.LCD11 = QtWidgets.QLCDNumber(self.centralwidget)
        self.LCD11.setGeometry(QtCore.QRect(110, 20, 50, 60))
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            self.LCD11.sizePolicy().hasHeightForWidth())
        self.LCD11.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setPointSize(16)
        self.LCD11.setFont(font)
        self.LCD11.setDigitCount(int(self.s1))
        self.LCD11.setObjectName("LCD11")
        self.lineEdit1 = QtWidgets.QLineEdit(self.centralwidget)
        self.lineEdit1.setGeometry(QtCore.QRect(230, 20, 100, 60))
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            self.lineEdit1.sizePolicy().hasHeightForWidth())
        self.lineEdit1.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setPointSize(16)
        font.setStyleStrategy(QtGui.QFont.PreferDefault)
        self.lineEdit1.setFont(font)
        self.lineEdit1.setInputMethodHints(QtCore.Qt.ImhDigitsOnly)
        self.lineEdit1.setAlignment(QtCore.Qt.AlignCenter)
        self.lineEdit1.setObjectName("lineEdit1")
        self.LCD1 = QtWidgets.QLCDNumber(self.centralwidget)
        self.LCD1.setGeometry(QtCore.QRect(10, 20, 50, 60))
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            self.LCD1.sizePolicy().hasHeightForWidth())
        self.LCD1.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setPointSize(16)
        self.LCD1.setFont(font)
        self.LCD1.setLayoutDirection(QtCore.Qt.LeftToRight)
        self.LCD1.setDigitCount(int(self.s1))
        self.LCD1.setObjectName("LCD1")
        self.splitter = QtWidgets.QSplitter(self.centralwidget)
        self.splitter.setGeometry(QtCore.QRect(60, 500, 331, 41))
        self.splitter.setOrientation(QtCore.Qt.Horizontal)
        self.splitter.setObjectName("splitter")
        self.pushButton = QtWidgets.QPushButton(self.splitter)
        font = QtGui.QFont()
        font.setPointSize(16)
        self.pushButton.setFont(font)
        self.pushButton.setObjectName("pushButton")
        self.pushButton_2 = QtWidgets.QPushButton(self.splitter)
        font = QtGui.QFont()
        font.setPointSize(16)
        self.pushButton_2.setFont(font)
        self.pushButton_2.setObjectName("pushButton_2")
        self.splitter_2 = QtWidgets.QSplitter(self.centralwidget)
        self.splitter_2.setGeometry(QtCore.QRect(60, 560, 301, 51))
        self.splitter_2.setOrientation(QtCore.Qt.Horizontal)
        self.splitter_2.setObjectName("splitter_2")
        self.label_67 = QtWidgets.QLabel(self.splitter_2)
        font = QtGui.QFont()
        font.setFamily("黑体")
        font.setPointSize(13)
        self.label_67.setFont(font)
        self.label_67.setAlignment(QtCore.Qt.AlignCenter)
        self.label_67.setObjectName("label_67")
        self.LCDgoal = QtWidgets.QLCDNumber(self.splitter_2)
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(
            self.LCDgoal.sizePolicy().hasHeightForWidth())
        self.LCDgoal.setSizePolicy(sizePolicy)
        font = QtGui.QFont()
        font.setPointSize(16)
        self.LCDgoal.setFont(font)
        self.LCDgoal.setDigitCount(3)
        self.LCDgoal.setObjectName("LCDgoal")
        MainWindow.setCentralWidget(self.centralwidget)

        self.retranslateUi(MainWindow)
        self.pushButton.clicked.connect(self.che)
        self.pushButton_2.clicked.connect(self.fre)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)

    def fre(self):
        self.LCD111.display(0)
        self.LCD222.display(0)
        self.LCD333.display(0)
        self.LCD444.display(0)
        self.LCD555.display(0)
        self.lineEdit1.clear()
        self.lineEdit_6.clear()
        self.lineEdit3.clear()
        self.lineEdit4.clear()
        self.lineEdit5.clear()
        self.LCDgoal.display(0)
        self.l1 = ra.randint(0, self.s5)
        self.l11 = ra.randint(0, self.s5)
        self.l2 = ra.randint(0, self.s5)
        self.l22 = ra.randint(0, self.s5)
        self.l3 = ra.randint(0, self.s5)
        self.l33 = ra.randint(0, self.s5)
        self.l4 = ra.randint(0, self.s5)
        self.l44 = ra.randint(0, self.s5)
        self.l5 = ra.randint(0, self.s5)
        self.l55 = ra.randint(0, self.s5)
        self.LCD1.display(self.l1)
        self.LCD11.display(self.l11)
        self.LCD2.display(self.l2)
        self.LCD22.display(self.l22)
        self.LCD3.display(self.l3)
        self.LCD33.display(self.l33)
        self.LCD4.display(self.l4)
        self.LCD44.display(self.l44)
        self.LCD5.display(self.l5)
        self.LCD55.display(self.l55)

    def che(self):
        self.goal = 0
        if (self.s2) == '+':
            self.LCD111.display(self.l11 + self.l1)
            self.LCD222.display(self.l22 + self.l2)
            self.LCD333.display(self.l33 + self.l3)
            self.LCD444.display(self.l44 + self.l4)
            self.LCD555.display(self.l55 + self.l5)

            if self.l11 + self.l1 == int(self.lineEdit1.text()):
                self.label.setText("✔")
                self.goal += 20
            else:
                self.label.setText("✘")
            if self.l22 + self.l2 == int(self.lineEdit_6.text()):
                self.label2.setText("✔")
                self.goal += 20
            else:
                self.label2.setText("✘")
            if self.l33 + self.l3 == int(self.lineEdit3.text()):
                self.label3.setText("✔")
                self.goal += 20
            else:
                self.label3.setText("✘")
            if self.l44 + self.l4 == int(self.lineEdit4.text()):
                self.label4.setText("✔")
                self.goal += 20
            else:
                self.label4.setText("✘")
            if self.l55 + self.l5 == int(self.lineEdit5.text()):
                self.label5.setText("✔")
                self.goal += 20
            else:
                self.label5.setText("✘")
        if (self.s2) == '*':
            self.LCD111.display(self.l11 * self.l1)
            self.LCD222.display(self.l22 * self.l2)
            self.LCD333.display(self.l33 * self.l3)
            self.LCD444.display(self.l44 * self.l4)
            self.LCD555.display(self.l55 * self.l5)

            if self.l11 * self.l1 == int(self.lineEdit1.text()):
                self.label.setText("✔")
                self.goal += 20
            else:
                self.label.setText("✘")
            if self.l22 * self.l2 == int(self.lineEdit_6.text()):
                self.label2.setText("✔")
                self.goal += 20
            else:
                self.label2.setText("✘")
            if self.l33 * self.l3 == int(self.lineEdit3.text()):
                self.label3.setText("✔")
                self.goal += 20
            else:
                self.label3.setText("✘")
            if self.l44 * self.l4 == int(self.lineEdit4.text()):
                self.label4.setText("✔")
                self.goal += 20
            else:
                self.label4.setText("✘")
            if self.l55 * self.l5 == int(self.lineEdit5.text()):
                self.label5.setText("✔")
                self.goal += 20
            else:
                self.label5.setText("✘")
        self.LCDgoal.display(self.goal)

    def retranslateUi(self, MainWindow):
        _translate = QtCore.QCoreApplication.translate
        MainWindow.setWindowTitle(_translate("MainWindow", "小学算数"))
        self.label.setText(_translate("MainWindow", ""))
        self.label_66.setText(_translate("MainWindow", "="))
        self.label_68.setText(_translate("MainWindow", self.s4))
        self.label2.setText(_translate("MainWindow", ""))
        self.label_70.setText(_translate("MainWindow", "="))
        self.label_71.setText(_translate("MainWindow", self.s4))
        self.label3.setText(_translate("MainWindow", ""))
        self.label_73.setText(_translate("MainWindow", "="))
        self.label_74.setText(_translate("MainWindow", self.s4))
        self.label4.setText(_translate("MainWindow", ""))
        self.label_76.setText(_translate("MainWindow", "="))
        self.label_77.setText(_translate("MainWindow", self.s4))
        self.label5.setText(_translate("MainWindow", ""))
        self.label_44.setText(_translate("MainWindow", "="))
        self.label_43.setText(_translate("MainWindow", self.s4))
        self.pushButton.setText(_translate("MainWindow", "CHECK"))
        self.pushButton_2.setText(_translate("MainWindow", "REFRESH"))
        self.label_67.setText(_translate("MainWindow", "YOUR GOAL:"))


class Ui_Dialog(object):
    def setupUi(self, Dialog):
        Dialog.setObjectName("Dialog")
        Dialog.resize(341, 222)
        sizePolicy = QtWidgets.QSizePolicy(
            QtWidgets.QSizePolicy.Fixed,
            QtWidgets.QSizePolicy.Fixed)
        sizePolicy.setHorizontalStretch(0)
        sizePolicy.setVerticalStretch(0)
        sizePolicy.setHeightForWidth(Dialog.sizePolicy().hasHeightForWidth())
        Dialog.setSizePolicy(sizePolicy)
        self.widget = QtWidgets.QWidget(Dialog)
        self.widget.setGeometry(QtCore.QRect(20, 30, 301, 131))
        self.widget.setObjectName("widget")
        self.gridLayout = QtWidgets.QGridLayout(self.widget)
        self.gridLayout.setContentsMargins(0, 0, 0, 0)
        self.gridLayout.setObjectName("gridLayout")
        self.pushButton = QtWidgets.QPushButton(self.widget)
        self.pushButton.setObjectName("pushButton")
        self.gridLayout.addWidget(self.pushButton, 0, 0, 1, 1)
        self.pushButton_4 = QtWidgets.QPushButton(self.widget)
        self.pushButton_4.setObjectName("pushButton_4")
        self.gridLayout.addWidget(self.pushButton_4, 1, 1, 1, 1)
        self.pushButton_2 = QtWidgets.QPushButton(self.widget)
        self.pushButton_2.setObjectName("pushButton_2")
        self.gridLayout.addWidget(self.pushButton_2, 0, 1, 1, 1)
        self.pushButton_3 = QtWidgets.QPushButton(self.widget)
        self.pushButton_3.setObjectName("pushButton_3")
        self.gridLayout.addWidget(self.pushButton_3, 1, 0, 1, 1)

        self.retranslateUi(Dialog)
        QtCore.QMetaObject.connectSlotsByName(Dialog)
        self.pushButton.clicked.connect(lambda: self.re('1+'))
        self.pushButton_4.clicked.connect(lambda: self.re('2*'))
        self.pushButton_2.clicked.connect(lambda: self.re('1*'))
        self.pushButton_3.clicked.connect(lambda: self.re('2+'))

    def retranslateUi(self, Dialog):
        _translate = QtCore.QCoreApplication.translate
        Dialog.setWindowTitle(_translate("Dialog", "选择题目类型"))
        self.pushButton.setText(_translate("Dialog", "一位数加法"))
        self.pushButton_4.setText(_translate("Dialog", "两位数乘法"))
        self.pushButton_2.setText(_translate("Dialog", "一位数乘法"))
        self.pushButton_3.setText(_translate("Dialog", "两位数加法"))

    def re(self, s):
        self.MainWindow1 = QtWidgets.QMainWindow()
        self.ui1 = Ui_MainWindow(s)
        self.ui1.setupUi(self.MainWindow1)
        self.MainWindow1.show()


if __name__ == "__main__":
    import sys
    import random as ra
    try:
        from PyQt5 import QtCore, QtGui, QtWidgets
    except BaseException:
        import os
        print('import PYQT, please wait...')
        os.system(
            'pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple --trusted-host pypi.tuna.tsinghua.edu.cn pyqt5')
    app = QtWidgets.QApplication(sys.argv)
    MainWindow = QtWidgets.QDialog()
    ui = Ui_Dialog()
    ui.setupUi(MainWindow)
    MainWindow.show()
    sys.exit(app.exec_())
