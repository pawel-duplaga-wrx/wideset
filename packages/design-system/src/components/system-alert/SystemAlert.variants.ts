import { cva } from 'class-variance-authority';

export const systemAlertVariants = cva(
  'gap-ws-9 px-ws-9 py-ws-3 flex w-full items-center justify-center',
  {
    variants: {
      status: {
        negative: '',
        notice: '',
        positive: '',
        info: '',
        neutral: '',
      },
      emphasis: {
        low: '',
        high: '',
      },
    },
    defaultVariants: {
      status: 'positive',
      emphasis: 'low',
    },
    compoundVariants: [
      {
        status: 'negative',
        emphasis: 'low',
        className: 'bg-ws-semantic-negative text-ws-semantic-on-subtle-negative',
      },
      {
        status: 'notice',
        emphasis: 'low',
        className: 'bg-ws-semantic-notice text-ws-semantic-on-subtle-notice',
      },
      {
        status: 'positive',
        emphasis: 'low',
        className: 'bg-ws-semantic-positive text-ws-semantic-on-subtle-positive',
      },
      {
        status: 'info',
        emphasis: 'low',
        className: 'bg-ws-semantic-info text-ws-semantic-on-subtle-info',
      },
      {
        status: 'neutral',
        emphasis: 'low',
        className: 'bg-ws-semantic-neutral text-ws-semantic-neutral',
      },
      {
        status: 'negative',
        emphasis: 'high',
        className: 'bg-ws-semantic-inverse-negative text-ws-semantic-on-inverse-negative',
      },
      {
        status: 'notice',
        emphasis: 'high',
        className: 'bg-ws-semantic-inverse-notice text-ws-semantic-on-inverse-notice',
      },
      {
        status: 'positive',
        emphasis: 'high',
        className: 'bg-ws-semantic-inverse-positive text-ws-semantic-on-inverse-positive',
      },
      {
        status: 'info',
        emphasis: 'high',
        className: 'bg-ws-semantic-inverse-info text-ws-semantic-on-inverse-info',
      },
      {
        status: 'neutral',
        emphasis: 'high',
        className: 'bg-ws-semantic-inverse-neutral text-ws-semantic-on-inverse-neutral',
      },
    ],
  },
);

export const systemAlertOnColorActionClassName =
  'text-current! border-current/24! hover:border-current/40! active:border-current/56! hover:bg-current/8! active:bg-current/12! outline-current!';

export const systemAlertIconVariants = cva('size-ws-11 shrink-0', {
  variants: {
    status: {
      negative: '',
      notice: '',
      positive: '',
      info: '',
      neutral: '',
    },
    emphasis: {
      low: '',
      high: '',
    },
  },
  defaultVariants: {
    status: 'positive',
    emphasis: 'low',
  },
  compoundVariants: [
    {
      status: 'negative',
      emphasis: 'low',
      className: 'text-ws-semantic-negative',
    },
    {
      status: 'notice',
      emphasis: 'low',
      className: 'text-ws-semantic-notice',
    },
    {
      status: 'positive',
      emphasis: 'low',
      className: 'text-ws-semantic-positive',
    },
    {
      status: 'info',
      emphasis: 'low',
      className: 'text-ws-semantic-info',
    },
  ],
});
