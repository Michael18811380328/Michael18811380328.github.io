#!/usr/bin/ruby
# coding=utf-8

APP_ROOT = File.dirname(__FILE__)

class Converter
  # Default path to ffmpeg installed by homebrew
  # 安装的 FFmpeg 默认目录
  @@ffmpeg = File.join('/', 'usr', 'local', 'bin', 'ffmpeg')

  # Default path to gifsicle installed by homebrew
  # 安装的 gifsicle 默认目录
  @@gifsicle = File.join('/', 'usr', 'local', 'bin', 'gifsicle')

  # Tell ffmpeg the max-width and max-height
  # FFmpeg 配置（最大高度和宽度、位图格式 rgb8）
  @@max_size = ["1280x1024", "800x640", "640x512", "600x480", "480x384", "300x240"][2]
  @@pixel_format = "rgb8"

  # Tell ffmpeg to reduce the frame rate from to 30
  # 图片帧率限制到 30 ftp
  @@frames = 30

  # Tell gifsicle to delay 30ms between each gif (in ms)
  # gifsicle 配置：每一帧延迟30ms
  @@delay = 3

  # Requests that gifsicle use the slowest/most file-size optimization
  # 使用最慢/最多的文件大小优化
  @@optimize = 3
  
  def initialize(input, output)
    shell_command = %{#{@@ffmpeg} -i #{input} -s #{@@max_size} -pix_fmt #{@@pixel_format} -r #{@@frames} -f gif - | #{@@gifsicle} --optimize=#{@@optimize} --delay=#{@@delay} > #{output}}
    # 创建 bash 命令 后面等于字符串拼接

    # puts command 执行命令
    %x[ #{shell_command} ]
  end
end

# Be careful not to use spaces.
# 这里设置输入和输出文件的目录：注意文件路径不要使用空格
input = File.join(APP_ROOT, 'media', 'Circle.mov')
output = File.join(APP_ROOT, 'media', 'Circle.gif')

Converter.new(input, output)
