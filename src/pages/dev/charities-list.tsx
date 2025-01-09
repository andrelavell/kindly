import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { useRouter } from 'next/router';

interface Charity {
  ein: string;
  name: string;
}

// This page is only available in development
export default function DevCharitiesList() {
  const router = useRouter();
  const [charities, setCharities] = useState<Charity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Redirect in production
    if (process.env.NODE_ENV === 'production') {
      router.push('/404');
      return;
    }

    async function fetchAllCharities() {
      try {
        const charitiesRef = collection(db, 'charities');
        const snapshot = await getDocs(charitiesRef);
        const results = snapshot.docs.map(doc => ({
          ein: doc.id,
          name: doc.data().name || 'No Name'
        }));
        setCharities(results.sort((a, b) => a.name.localeCompare(b.name)));
      } catch (error) {
        console.error('Error fetching charities:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllCharities();
  }, [router]);

  // Show nothing in production
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-rose-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Development Banner */}
        <div className="mb-4 bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Development Only</h3>
              <p className="text-sm text-yellow-700 mt-1">
                This page is only available in development mode and will not be included in production builds.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">
              All Charities ({charities.length.toLocaleString()})
            </h1>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    EIN
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {charities.map((charity) => (
                  <tr key={charity.ein} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {charity.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {charity.ein}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Prevent page from being statically generated
export const getServerSideProps = async () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      notFound: true // This will show the 404 page in production
    };
  }
  
  return {
    props: {} // Return empty props in development
  };
};
