import React, { memo, Fragment, useState } from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Button from './Button';
import Dialog, {
  DialogContent, DialogTitle, DialogDescription, DialogActions,
} from './Dialog';

interface Props {
  className?: string,
  setOpen?: (open: boolean) => void,
  open?: boolean,
  onlyModal?: boolean,
}

function SupportedWebhookVariables({
  className = '', open, setOpen, onlyModal = false, ...rest
}: Props) {
  const [localOpen, localSetOpen] = useState(false);

  return (
    <Fragment>
      {!onlyModal && (
        <button
          onClick={() => (setOpen ?? localSetOpen)?.(true)}
          type="button"
          className={clsx('group inline-flex items-center text-sm text-gray-500 hover:text-gray-900', className)}
          {...rest}
        >
          <QuestionMarkCircleIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
          <span className="ml-2 font-normal">Supports Variables</span>
        </button>
      )}
      <Dialog open={open ?? localOpen} setOpen={setOpen ?? localSetOpen}>
        <DialogContent>
          <DialogTitle>Supported Variables</DialogTitle>
          <DialogDescription>
            {'All variables like `{{.Source.Event}}` will be replaced with actual data'}
          </DialogDescription>
          <div className="prose mt-6">
            <pre>
              <code>
                {`{{.ID}} - Local event ID. That event ID is the same across all attempts of CURRENT webhook
                  {{.Source.ID}} - Global Event ID. That event ID is the same across ALL webhooks
                  {{.Attempts}} - How many attempts has been made already
                  {{.LastResponseCode}} - Last HTTP code returned by this endpoint
                  {{.LastResponseTime}} - Last response time by this endpoint
                  {{.Status}} - Current status of this task
                  {{.LastError}} - Last error message
                  {{.Created}} - Initial datetime of the current event
                  {{.WebhookName}} - Current webhook name
                  {{.Source.Project}} - Project name
                  {{.Source.Event}} - Event name`}
              </code>
            </pre>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="white" onClick={() => (setOpen ?? localSetOpen)?.(false)}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default memo(SupportedWebhookVariables);
