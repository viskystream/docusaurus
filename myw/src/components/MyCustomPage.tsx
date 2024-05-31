import React from 'react';

function MyCustomPage({ customData }) {
  console.log("customData");
  console.log(customData);
  return (
    <div>
      <h1>My Custom Page</h1>
      <div>
        {customData.map(item => (
          <div key={item.id}>{item.content}</div>
        ))}
      </div>
    </div>
  );
}

export default MyCustomPage;