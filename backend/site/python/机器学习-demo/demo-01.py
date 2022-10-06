from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

def datasets_demo():
  """
  learn sklearn dataset
  """

  # load data from local dataset
  iris = load_iris()
  # print("iris datasets test", iris["DESCR"])
  # print(iris.feature_names, iris.target_names)
  # print(iris.data, iris.data.shape)

  # split data into two subset, train set and target set
  x_train, x_test, y_train, y_test = train_test_split(iris.data, iris.target, test_size = 0.2, random_state = 20)
  print(x_train, x_test, y_train, y_test)
  return None

if __name__ == "__main__":
  datasets_demo()
