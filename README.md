# Panoptibrowse

The idea is to have a page similar to https://panopticlick.eff.org/ to:

- check if a website can detect that you're in private browsing mode *with actionable things the user can do to prevent it.*
- what guarantees their browser provides them.


## Private Browsing Modes To Research

- Chrome
- Firefox
- Safari
- Brave
- Tor?
- Opera
- IE
- Is there a difference in the mobile browser version?

## Techniques To Detect Private Browsing Modes

- webkit requestfilesystem (mainly used for Chrome): 
https://arstechnica.com/information-technology/2019/07/chrome-76-prevents-nyt-and-other-news-sites-from-detecting-incognito-mode/
- localstorage (safari)
- indexeddb (mozilla)


## What Features Can A Private Browsing Mode Provide?

- clears cookies and history
- HTML5 local storage
- bookmarks
- password db
- form autocomplete
- downloaded items list
- downloaded items
- search box search terms
- browser's web cache
- enhanced web tracking?

## Browser Documented Behavior (in progress)

https://wiki.mozilla.org/Private_Browsing

- clears cookies on session close (last window close)
- clears history (")
- no passwords
- downloads?
- prevents the session's data from writing to persistent storage
- user actions are fine i.e. saves bookmarks as unvisited
- protects against 'online tracking' -- how?


## Resources

- https://wiki.mozilla.org/Private_Browsing
- https://w3ctag.github.io/private-browsing-modes/
- Collection of detection scripts: https://gist.github.com/kdzwinel/783df9b129ae5c8443dd96c0d4ed9723
https://github.com/w3cping/privacy-mode/blob/master/private-browsing.md
- User expectations: https://www.blaseur.com/papers/www18privatebrowsing.pdf
- Mark's draft: https://gist.github.com/mnot/96440a5ca74fcf328d23
- Usenix: https://www.usenix.org/conference/soups2018/presentation/habib-prying
- Comparison, blog post: https://www.digitalcitizen.life/what-is-private-browsing-which-browser-is-best

## Thoughts

- If we have a fingerprinting protection that you add in private browsing mode, then necessarily that will be a signal that you are in Private Browsing. Unless you lie convincingly. 
- There is a valuable research project in categorizing existing private browsing modes. Great paper from 2010: https://crypto.stanford.edu/~dabo/pubs/papers/privatebrowsing.pdf
- Could we detect guarantees on-the-fly? Could we test canvas protection (for e.g.)? 
