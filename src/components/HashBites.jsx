// import React from 'react'

const HashBites = ({ hashtag, getHashtag }) => {
  return (
    <span className="hash-bite" onClick={() => getHashtag(hashtag)}>
      #{hashtag}
    </span>
  );
};

export default HashBites;
