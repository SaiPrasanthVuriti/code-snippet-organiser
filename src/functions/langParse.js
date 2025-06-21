export const langParse1=  (ext) => {
    switch (ext) {
      case "js": return 'JavaScript';
      case "ts": return 'TypeScript';
      case "p":  return 'python';
      case "h":  return 'HTML';
      case "c":  return 'CSS';
      case "n":  return 'JSON';
      case "s":  return 'SQL';
      case "m":  return 'Markdown';
      case "j":  return 'Java';
      case "cpp":return 'C/C++';
      default :return ''
    }
  };
 
  export const langParse2 = (ext) => {
  switch (ext) {
  
   
      case 'JavaScript': return 'js' ;
      case 'TypeScript': return 'ts' ;
      case "python":  return 'p';
      case "HTML":  return 'h';
      case "CSS":  return 'c';
      case "JSON":  return 'n';
      case "SQL":  return 's';
      case "Markdown":  return 'm';
      case "Java":  return 'j';
      case "C/C++":return 'cpp';
      default :return ''

  };
  }
