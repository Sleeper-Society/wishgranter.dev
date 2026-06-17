fetch("/docs/menu.html")
    .then((response) => {
        if (response.ok) {
            return response.text();
        }
        throw new Error();
    })
    .then((text) => {
        const parser = new DOMParser();
        const menu_html = parser.parseFromString(text, "text/html");
        const menu = menu_html.body.children[0] as HTMLElement;
        document.body.insertBefore(menu, document.body.firstChild);

        Array.from(menu_html.getElementsByTagName("link"))
            .filter((element) => element.getAttribute("rel") == "stylesheet")
            .forEach((element) =>
                document.head.append(element.cloneNode(true)),
            );
        Array.from(document.head.getElementsByTagName("script"))
            .filter(
                (element) => element.getAttribute("src") == "/mod_docs/menu.js",
            )
            .forEach((element) => element.remove());
    });
