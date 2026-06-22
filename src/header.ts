fetch("/header.html")
    .then((response) => {
        if (response.ok) {
            return response.text();
        }
        throw new Error("Header not found");
    })
    .then((text: string) => {
        const parser = new DOMParser();
        const menu_html = parser.parseFromString(text, "text/html");
        const header = menu_html.body.children[0] as HTMLElement;
        const footer = menu_html.body.children[1] as HTMLElement;

        document.body.insertBefore(
            header.cloneNode(true),
            document.body.firstChild,
        );
        document.body.append(footer.cloneNode(true));

        Array.from(menu_html.head.getElementsByTagName("link")).forEach(
            (element) => document.head.append(element.cloneNode(true)),
        );

        Array.from(document.head.getElementsByTagName("script"))
            .filter((element) => element.getAttribute("src") == "/header.js")
            .forEach((element) => element.remove());
    });
