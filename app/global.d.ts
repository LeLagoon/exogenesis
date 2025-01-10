// global.d.ts
declare namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        alt?: string;
        'auto-rotate'?: boolean;
        'camera-controls'?: boolean;
        ar?: boolean;
        'shadow-intensity'?: string | number;
        'ar-modes'?: string;
        'poster'?: string;
      };
    }
  }
  