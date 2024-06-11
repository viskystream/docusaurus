/* eslint-disable max-len */
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '../../../components/Card';
import RadioGroup from '../../../components/RadioGroup';
import { useXcodeRegion } from '..';

function XcodeHosts() {
  const { isLoading, region } = useXcodeRegion({
    select: ({ isLoading, data }) => ({ isLoading, region: data?.region ?? {} }),
  });

  const [selected, setSelected] = useState(null);

  const options = useMemo(
    () => Object.keys(region).map((key) => ({
      name: key.toUpperCase(),
      value: key,
      description: '',
    })),
    [region],
  );

  const hosts = useMemo(() => {
    if (!selected) {
      return [];
    }

    return region[selected];
  }, [region, selected]);

  return (
    <Card>
      <CardHeader primary="Xcode Hosts" />
      <CardContent>
        <RadioGroup loading={isLoading} title="Region" value={selected} onChange={setSelected} options={options} />
      </CardContent>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Host
                    </th>
                    {/* <th
											scope='col'
											className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Title
										</th>
										<th
											scope='col'
											className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Email
										</th>
										<th
											scope='col'
											className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
											Role
										</th> */}
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {hosts.map((host) => (
                    <tr key={host.email}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{host.host}</td>
                      {/* <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{host.title}</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{host.email}</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{host.role}</td> */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link to={`/${host.host.replace(':', '/')}`} className="text-primary-600 hover:text-primary-900">
                          Xcode
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default XcodeHosts;
