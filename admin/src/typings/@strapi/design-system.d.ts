declare module '@strapi/design-system/Flex' {
  export const Flex: React.FunctionComponent<{
    justifyContent: string;
    alignItems: string;
    width: number;
    height:number;
    hasRadius: boolean;
    'aria-hidden': boolean;
    children: JSX.Element;
  }>;
}

declare module '@strapi/design-system/Icon' {
  export const Icon: React.FC<{
    as: React.FC;
  }>;
}

declare module '@strapi/design-system/Tooltip' {
  export const Tooltip: React.FC<{
    description: string;
  }>;
}

declare module '@strapi/design-system/TextInput' {
  export const TextInput: React.FC<{
    type: string;
    id: string;
    label: string;
    name: string;
    value: string;
    required: boolean;
    disabled: boolean;
    placeholder: string;
    hint: string;
    error?: unknown;
    onChange(e: React.ChangeEvent): void;
    startAction: JSX.Element;
  }>;
}

declare module '@strapi/design-system/Field' {
  export const FieldAction: React.FC<{
    label: string;
    onClick(e: React.MouseEvent): void;
  }>;
}

declare module '@strapi/design-system/Button' {
  export const Button: React.FC<{
    onClick(e: React.MouseEvent): void;
    variant: string;
  }>;
}

declare module '@strapi/design-system/Typography' {
  export const Typography: React.FC<{
    fontWeight: string;
    textColor: string;
    as: string;
    id: string;
  }>;
}

declare module '@strapi/design-system/ModalLayout' {
  export const ModalLayout: React.FC<{
    labelledBy: string;
    onClose(): void;
  }>;
  export const ModalBody: React.FC;
  export const ModalHeader: React.FC;
  export const ModalFooter: React.FC<{
    startActions: JSX.Element;
    endActions: JSX.Element;
  }>;
}
