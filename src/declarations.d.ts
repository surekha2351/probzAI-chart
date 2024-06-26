declare module 'dom-to-image' {
    const toPng: (node: HTMLElement, options?: any) => Promise<string>;
    const toJpeg: (node: HTMLElement, options?: any) => Promise<string>;
    const toSvg: (node: HTMLElement, options?: any) => Promise<string>;
    export { toPng, toJpeg, toSvg };
  }
  