'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';

export default function TestDBPage() {
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const testGuestInsert = async () => {
    setIsLoading(true);
    setResult('Testing...');

    try {
      // Using singleton supabase client
      // Test direct insert into guests table
      const { data, error } = await supabase
        .from('guests')
        .insert({
          first_name: 'Test',
          last_name: 'User',
          email: `test-${Date.now()}@example.com`,
          phone: '1234567890',
        })
        .select()
        .single();

      if (error) {
        setResult(`Error: ${error.message}\nDetails: ${JSON.stringify(error, null, 2)}`);
      } else {
        setResult(`Success! Created guest:\n${JSON.stringify(data, null, 2)}`);
      }
    } catch (err) {
      setResult(`Exception: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testTableExists = async () => {
    setIsLoading(true);
    setResult('Checking tables...');

    try {
      // Using singleton supabase client
      // Test if guests table exists by selecting with count
      const { count, error } = await supabase
        .from('guests')
        .select('*', { count: 'exact', head: true });

      if (error) {
        setResult(
          `Table check error: ${error.message}\nDetails: ${JSON.stringify(error, null, 2)}`
        );
      } else {
        setResult(`✅ Guests table exists!\nCurrent guest count: ${count || 0}`);
      }
    } catch (err) {
      setResult(`Exception: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-xl">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-xl">Database Test Page</h1>

        <div className="flex gap-md mb-xl">
          <button onClick={testTableExists} disabled={isLoading} className="btn btn-secondary">
            Test Table Exists
          </button>
          <button onClick={testGuestInsert} disabled={isLoading} className="btn btn-primary">
            Test Guest Insert
          </button>
        </div>

        <div className="bg-gray-100 p-lg rounded-lg">
          <h3 className="font-medium mb-md">Result:</h3>
          <pre className="text-sm whitespace-pre-wrap">{result || 'Click a button to test...'}</pre>
        </div>
      </div>
    </div>
  );
}
