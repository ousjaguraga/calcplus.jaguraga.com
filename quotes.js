const getRandomQuote = () => {
    const quotes = [
      "Never give up !",
      "Tomorrow is better !",
      "Believe in YOU !",
  
      "Mission 50 !",
      "Be your Hero !",
      "Dream Big !",
      "BE the BEST !",
      "GO for PERFECT !",
      "Failure is a Gift",
      "Do it NOW!",
      "Be Great!",
      "Yes you can!",
      "Just do it!",
      "Think different",
      "Give more, take less",
      "Count your blessings!",
      "Go for it!",
      "Now or never",
      "Against all odds!",
      "Dont't U dare quit",
      "Winners never quit",
      
  
  
    ];
    randomIndex = Math.floor(Math.random(0, 1) * quotes.length);
    text = quotes[randomIndex];
    return text;
  };

  export default getRandomQuote;
  