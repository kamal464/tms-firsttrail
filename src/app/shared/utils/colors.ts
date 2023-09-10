export function getRandomColors() {
    const colors = [];
    colors.push(getRandomColor());
    colors.push(isColorDark(colors[0]) ? '#000' : '#fff');
    return colors;
  }
  
  export function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  export function isColorDark(color: any) {
    let r: number;
    let g: number;
    let b: number;
    let hsp: number;
    if (color.match(/^rgb/)) {
      color = color.match(
        /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
      );
      r = color[1];
      g = color[2];
      b = color[3];
    } else {
      color = +('0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&'));
      // tslint:disable-next-line:no-bitwise
      r = color >> 16;
      // tslint:disable-next-line:no-bitwise
      g = (color >> 8) & 255;
      // tslint:disable-next-line:no-bitwise
      b = color & 255;
    }
    hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
    return hsp > 127.5 ? false : true;
  }
  