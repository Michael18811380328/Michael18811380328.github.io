import os


def generate_tree(path, indent='', output='console', indent_char=' '):
    result = ''
    for item in os.listdir(path):
        item_path = os.path.join(path, item)
        if os.path.isdir(item_path):
            result += f"{indent}+ {item}\n"
            result += str(generate_tree(item_path, indent +
                          indent_char, output, indent_char))
        else:
            result += f"{indent}- {item}\n"

    print(result)
    if output == 'console':
        print(result)
    else:
        with open(output, 'w') as f:
            f.write(result)


if __name__ == '__main__':
    generate_tree('./docs', output='output.txt')
