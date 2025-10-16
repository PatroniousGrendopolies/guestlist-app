'use client';

import { useState, useTransition, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

interface AcceptInvitationFormProps {
  acceptInvitationAction: (formData: FormData) => Promise<{
    status: 'success' | 'error' | 'info' | 'warning';
    message: string;
    assigned_role?: string;
  }>;
  initialToken: string | null;
}

function AcceptInvitationForm({ acceptInvitationAction, initialToken }: AcceptInvitationFormProps) {
  const searchParamsHook = useSearchParams();
  const [token, setToken] = useState(initialToken || '');
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info' | 'warning'>('info');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!initialToken) {
      const tokenFromUrl = searchParamsHook.get('token');
      if (tokenFromUrl) {
        setToken(tokenFromUrl);
      }
    }
  }, [initialToken, searchParamsHook]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);
    if (!token) {
      setMessage('Invitation token is missing.');
      setMessageType('error');
      return;
    }
    startTransition(async () => {
      const formData = new FormData();
      formData.append('token', token);
      const result = await acceptInvitationAction(formData);
      setMessage(result.message);
      setMessageType(result.status);
    });
  };

  if (!token && !searchParamsHook.get('token')) {
    return (
      <p className="text-red-500 p-4 text-center">
        Invitation token is missing. Please use the link provided in your invitation.
      </p>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl border border-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Accept Your Invitation</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="token" className="block text-sm font-medium text-gray-700 mb-1">
            Invitation Token
          </label>
          <input
            type="text"
            name="token"
            id="token"
            value={token}
            onChange={e => setToken(e.target.value)}
            readOnly={!!initialToken || !!searchParamsHook.get('token')}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-50 disabled:opacity-75"
            required
            aria-describedby="token-description"
          />
          <p id="token-description" className="mt-2 text-xs text-gray-500">
            This token should be pre-filled from your invitation link.
          </p>
        </div>
        <button
          type="submit"
          disabled={isPending || !token}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-150 ease-in-out"
        >
          {isPending ? 'Accepting Invitation...' : 'Accept Invitation'}
        </button>
      </form>
      {message && (
        <div
          className={`mt-6 p-4 rounded-md text-sm font-medium border ${
            messageType === 'success'
              ? 'bg-green-50 border-green-300 text-green-700'
              : messageType === 'error'
                ? 'bg-red-50 border-red-300 text-red-700'
                : messageType === 'warning'
                  ? 'bg-yellow-50 border-yellow-300 text-yellow-700'
                  : 'bg-blue-50 border-blue-300 text-blue-700'
          }`}
          role="alert"
        >
          <p className="font-semibold">
            {messageType.charAt(0).toUpperCase() + messageType.slice(1)}
          </p>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default AcceptInvitationForm;
