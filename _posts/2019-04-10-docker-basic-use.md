---
layout: post
title:  "docker"
date:   2019-04-08 17:59:11 +0800
categories: jekyll update
---

### docker 常见操作补充

参考官方文档

<https://docs.docker.com/docker-for-mac/install/>

#### 1. 基本操作

检查当前 docker 版本

~~~bash
192:~ seafile$ docker --version
Docker version 18.09, build c97c6d6

192:~ seafile$ docker-compose --version
docker-compose version 1.24.0, build 8dd22a9

192:~ seafile$ docker-machine --version
docker-machine version 0.16.0, build 9ba6da9
~~~

运行一个镜像（如果没有就会联网安装）

~~~bash
docker run hello-world
# 如果找不到就到官方去 pull
~~~

使用docker搭建一个网络服务器 nginx

~~~bash
docker run --detach --publish=80:80 --name=webserver nginx
docker run --detach --publish=80:80 --name=webserver nginx
~~~

现在打开浏览器访问 localhost 即可看到 nginx 的界面

当容器已经运行，可以查看容器的细节

~~~bash
docker ps
# 等价于
docker container ls
~~~

停止容器

~~~bash
docker container stop webserver
docker container rm webserver
docker image rm nginx
~~~

删除已有容器和镜像操作

~~~bash
# 查看当前的镜像的ID(共计五个，三个公司的，helloworld nginx)
192:~ seafile$ docker ps -aq
30b8a8b128f4
ec328f5a228d
73b12bea8807
dfdf5180c891
3b54b280d6ef

# 列出当前的镜像(详情)，就是把上面的详情列出来
192:~ seafile$ docker image ls
REPOSITORY                                       TAG                 IMAGE ID            CREATED             SIZE
nginx                                            latest              27a188018e18        6 days ago          109MB
hello-world                                      latest              fce289e99eb9        3 months ago        1.84kB
docker.seafile.top/seafile-dev/seafile-pro-dev   master              74f5640d3df7        7 months ago        1.04GB
docker.seafile.top/seafile-dev/mariadb           10.3                2c73b3262fff        9 months ago        363MB
memcached                                        1.4-alpine          273374b463b8        21 months ago       7.68MB

# 删除一个镜像，但是不能直接删除镜像的仓库，需要删除镜像的ID
192:~ seafile$ docker image rm hello-world
Error response from daemon: conflict: unable to remove repository reference "hello-world" (must force) - container ec328f5a228d is using its referenced image fce289e99eb9

# 列出当前的容器
192:~ seafile$ docker container ls
CONTAINER ID        IMAGE                                                   COMMAND                  CREATED             STATUS              PORTS                                                                    NAMES
30b8a8b128f4        nginx                                                   "nginx -g 'daemon of…"   5 hours ago         Up 22 minutes       0.0.0.0:80->80/tcp                                                       webserver
73b12bea8807        docker.seafile.top/seafile-dev/seafile-pro-dev:master   "/sbin/my_init -- /r…"   6 months ago        Up 22 minutes       0.0.0.0:3000->3000/tcp, 0.0.0.0:8000->8000/tcp, 0.0.0.0:8082->8082/tcp   seafile-dev-pro
dfdf5180c891        docker.seafile.top/seafile-dev/mariadb:10.3             "docker-entrypoint.s…"   6 months ago        Up 22 minutes       0.0.0.0:3306->3306/tcp                                                   seafile-mysql
3b54b280d6ef        memcached:1.4-alpine                                    "docker-entrypoint.s…"   6 months ago        Up 22 minutes       0.0.0.0:11211->11211/tcp                                                 seafile-memcached

# 强行删除 30b8a8b128f4 nginx 容器 
192:~ seafile$ docker rm -f 30b8a8b128f4
30b8a8b128f4

# 可以看出容器以及被删除
192:~ seafile$ docker container ls
CONTAINER ID        IMAGE                                                   COMMAND                  CREATED             STATUS              PORTS                                                                    NAMES
73b12bea8807        docker.seafile.top/seafile-dev/seafile-pro-dev:master   "/sbin/my_init -- /r…"   6 months ago        Up 23 minutes       0.0.0.0:3000->3000/tcp, 0.0.0.0:8000->8000/tcp, 0.0.0.0:8082->8082/tcp   seafile-dev-pro
dfdf5180c891        docker.seafile.top/seafile-dev/mariadb:10.3             "docker-entrypoint.s…"   6 months ago        Up 23 minutes       0.0.0.0:3306->3306/tcp                                                   seafile-mysql
3b54b280d6ef        memcached:1.4-alpine                                    "docker-entrypoint.s…"   6 months ago        Up 23 minutes       0.0.0.0:11211->11211/tcp                                                 seafile-memcached

# 删除容器后，再删除镜像(NGINX)
192:~ seafile$ docker rmi 27a188018e18
Untagged: nginx:latest
Untagged: nginx@sha256:e71b1bf4281f25533cf15e6e5f9be4dac74d2328152edf7ecde23abc54e16c1c
Deleted: sha256:27a188018e1847b312022b02146bb7ac3da54e96fab838b7db9f102c8c3dd778
Deleted: sha256:261d1996088c57b71d8ea9412f719bcbb8f4cb68a6e463d30abb85cc5fc5724b
Deleted: sha256:e6fbd1f039a7391ab57afeb1b11a73781bcbd6ae8041d98c5988b90c46ce5726
Deleted: sha256:5dacd731af1b0386ead06c8b1feff9f65d9e0bdfec032d2cd0bc03690698feda

# 已经删除镜像 NGINX
192:~ seafile$ docker images
REPOSITORY                                       TAG                 IMAGE ID            CREATED             SIZE
hello-world                                      latest              fce289e99eb9        3 months ago        1.84kB
docker.seafile.top/seafile-dev/seafile-pro-dev   master              74f5640d3df7        7 months ago        1.04GB
docker.seafile.top/seafile-dev/mariadb           10.3                2c73b3262fff        9 months ago        363MB
memcached                                        1.4-alpine          273374b463b8        21 months ago       7.68MB
~~~

#### 2. 配置

在 docker 配置菜单中

1. 通用：配置docker开机启动、自动升级、用户统计反馈、虚拟机备份、记住docker登录等（使用默认）
2. 文件共享：设置docker的运行目录。使用默认配置。
3. 高级：设置docker运行的硬件资源：通常情况，docker使用宿主机的一半CPU（如果需要增加或者减少性能，可以改变CPU个数）；内存通常使用宿主机的2G运行内存（可以增加或者减少）swap 虚拟内存，通常设置为1G虚拟内存。现在电脑的CPU吃不消，所以增加内存和虚拟内存，增加CPU个数，这样可以缓解单个CPU的性能。
4. 用户代理：选择默认的用户代理
5. 存储位置和容量：可以迁移镜像在计算机中的位置和设置容量