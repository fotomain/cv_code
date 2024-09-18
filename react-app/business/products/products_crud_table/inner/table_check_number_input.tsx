
export const check_number_input=(e:any) => {

    console.log('=== e.key ',e.key)
    if(-1!==[
        'Home','End','Delete','Backspace',
        'ArrowLeft','ArrowRight','ArrowUp','ArrowDown',
        'PageUp','PageDown',
        'Tab',
        'F5',
    ].indexOf(e.key)) return

    if(((e.key.toLowerCase() === "z" && (e.metaKey || e.ctrlKey)))){
        return;
    }
    if(((e.key.toLowerCase() === "c" && (e.metaKey || e.ctrlKey)))){
        return;
    }
    if(((e.key.toLowerCase() === "v" && (e.metaKey || e.ctrlKey)))){
        return;
    }
    if(((e.key === "Tab" && (e.metaKey || e.shiftKey)))){
        return;
    }

    const re = /[^0-9.]|(?<=\..*)\./g;

    if (re.test(e.key)) {
        e.preventDefault();
    }

    // const re = /[0-9A-F:]+/g;
}
