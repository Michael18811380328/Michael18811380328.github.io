#!/usr/bin/ruby -w

class Block
    # same as constructor
    def initialize(width, height)
        @width = width
        @height = height
    end

    def getWidth
        @width
    end

    def getHeight
        @height
    end

    def setWidth=(value)
        @width = value
    end

    # attention: `function_name=(parameter)` no space
    def setHeight=(value)
        @height = value
    end
end

# craete a new object
box = Block.new(10, 20)
 
box.setWidth = 30
box.setHeight = 50

x = box.getWidth()
y = box.getHeight()
 
puts "block width: #{x} and block height #{y}"
