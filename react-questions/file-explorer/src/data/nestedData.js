const explorerTree = {
   id: '1',
   name: 'root',
   isFolder: true,
   items: [
      {
         id: '2',
         name: 'public',
         isFolder: true,
         items: [
            {
               id: '3',
               name: 'images',
               isFolder: true,
               items: [
                  {
                     id: '4',
                     name: 'logo.png',
                     isFolder: false,
                     items: [],
                  },
                  {
                     id: '5',
                     name: 'favicon.ico',
                     isFolder: false,
                     items: [],
                  },
               ],
            },
         ],
      },
      {
         id: '6',
         name: 'src',
         isFolder: true,
         items: [
            {
               id: '7',
               name: 'components',
               isFolder: true,
               items: [
                  {
                     id: '8',
                     name: 'Todo.jsx',
                     isFolder: false,
                     items: [],
                  },
                  {
                     id: '9',
                     name: 'Button',
                     isFolder: true,
                     items: [
                        {
                           id: '10',
                           name: 'Button.jsx',
                           isFolder: false,
                           items: [],
                        },
                     ],
                  },
               ],
            },
            {
               id: '11',
               name: 'Pages',
               isFolder: true,
               items: [
                  {
                     id: '12',
                     name: 'Search.jsx',
                     isFolder: false,
                     items: [],
                  },
               ],
            },
         ],
      },
   ],
};

export default explorerTree;
