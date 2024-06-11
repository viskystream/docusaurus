import * as heroicons from '@heroicons/react/24/outline';
import baseAPI from '../baseAPI';

type IconName = keyof typeof heroicons

export interface ApiRouteType {
  name: string
  key: string
  description: string
  href: string
  icon: IconName
  color: string
  category: {
    name: string
    key: string
  }
  roles: string[]
}

export interface Category {
  name: string
  routes: ApiRouteType[]
}

interface Categories {
  [key: string]: Category
}

const extendedAPI = baseAPI.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getUserRoutes: builder.query<Categories, any>({
      query: () => ({
        url: '/api/v1/oauth/routes',
        method: 'GET',
      }),
      transformResponse: (response: ApiRouteType[]) => response.reduce((prev: Categories, curr) => {
        // Hide kubernetes routes
        if (curr.key.includes('kubernetes')) {
          return prev;
        }

        if (!prev[curr.category.key]) {
          prev[curr.category.key] = {
            name: curr.category.name,
            routes: [curr],
          };
        } else {
          prev[curr.category.key].routes.push(curr);
        }

        return prev;
      }, {}),
      providesTags: ['UserRoutes'],
    }),
  }),
});

export const { useGetUserRoutesQuery } = extendedAPI;

export default extendedAPI;
