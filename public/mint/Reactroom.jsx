import React, { useEffect } from 'react';
const VirtualPanoramaPage = ()=> {
    const [htmlContent, setHtmlContent] = useState('');

    useEffect(() => {
      // Fetch the HTML content dynamically
      fetch('./hotel1.html')
        .then(response => response.text())
        .then(content => {
          setHtmlContent(content);
        })
        .catch(error => console.error('Error fetching HTML content:', error));
    }, []);
  
    return(
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    )
}

export default VirtualPanoramaPage;