#!/usr/bin/ruby -w

class Block
    def initialize(width, height)
        @width, @height = width, height
    end

    def getArea
        @width * @height
    end
end


class BigBox < Block
    def printArea
      @area = @width * @height
      puts "Big box area is : #{@area}"
    end
end

box = BigBox.new(10, 20)

box.printArea()
