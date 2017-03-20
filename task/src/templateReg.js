var templateReg = {
	widget: [/{widget ([\s\S]*?)}$/mgi, '<% include($1) %>'],
};

export default templateReg;
