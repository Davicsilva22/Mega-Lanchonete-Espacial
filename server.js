const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { randomUUID } = require("node:crypto");

const PORT = Number(process.env.PORT || 3000);
const ROOT = __dirname;
const products = [
  {id:1,nome:"XBurger Galáctico",preco:23.90,categoria:"hamburguer",descricao:"Hambúrguer bovino, queijo cheddar, alface, tomate, cebola roxa e molho especial. Acompanha batatas fritas. Uma explosão de sabor interplanetária!",imagem:1},
  {id:2,nome:"Chicken Espacial",preco:24.90,categoria:"hamburguer",descricao:"Frango empanado e crocante, cheddar, alface, tomate e molho cremoso no pão com gergelim. Acompanha batatas fritas para completar a missão!",imagem:2},
  {id:3,nome:"Costela dos Deuses",preco:29.90,categoria:"hamburguer",descricao:"Costela bovina desfiada, cheddar derretido e molho barbecue em um pão macio com gergelim. Acompanha batatas fritas. Um sabor digno dos deuses do universo!",imagem:3},
  {id:4,nome:"Seis Órbitas",preco:31.90,categoria:"hamburguer",descricao:"Seis carnes bovinas empilhadas com camadas de cheddar, salada e molho especial. Acompanha batatas fritas. Um desafio colossal para os maiores exploradores da galáxia!",imagem:4},
  {id:5,nome:"Frango Duplo Cósmico",preco:28.90,categoria:"hamburguer",descricao:"Hambúrguer com dois filés de frango empanados e crocantes. Uma missão em dobro para os amantes de frango!",imagem:5},
  {id:6,nome:"Combo Galáxia Suprema",preco:40.90,categoria:"hamburguer",descricao:"Dois cheeseburgers, batatas fritas douradinhas e Coca-Cola de 1 litro. Um combo completo para compartilhar uma experiência de outro planeta!",imagem:6},
  {id:7,nome:"Combo Costela Cósmica",preco:49.90,categoria:"hamburguer",descricao:"Dois hambúrgueres de costela desfiada, batatas fritas e Coca-Cola de 1 litro. Uma explosão de sabor digna das estrelas!",imagem:7},
  {id:8,nome:"Combo Frango Estelar",preco:42.90,categoria:"hamburguer",descricao:"Dois hambúrgueres de frango empanado, batatas fritas e Coca-Cola de 1 litro. Crocância em dobro para uma aventura intergaláctica!",imagem:8},
  {id:9,nome:"Supernova",preco:22.90,categoria:"aperitivos",descricao:"Batatas fritas cobertas com cheddar derretido e bacon crocante. Uma explosão de sabor!",imagem:9},
  {id:10,nome:"Nuggets de Marte",preco:16.90,categoria:"aperitivos",descricao:"Nuggets de frango crocantes acompanhados de ketchup. Pequenos meteoritos de puro sabor!",imagem:10},
  {id:11,nome:"Anéis de Saturno",preco:16.90,categoria:"aperitivos",descricao:"Anéis de cebola empanados e douradinhos, acompanhados de ketchup. Crocância de outro planeta!",imagem:11},
  {id:12,nome:"Meteoritos Crocantes",preco:10.90,categoria:"aperitivos",descricao:"Mini coxinhas de frango sem massa, empanadas e crocantes, recheadas com frango desfiado. Pequenas no tamanho, gigantes no sabor!",imagem:12},
  {id:13,nome:"Asas de Júpiter",preco:17.00,categoria:"aperitivos",descricao:"Drumetes de frango douradinhos, cobertos com molho especial e acompanhados de molho cremoso. Uma explosão de sabor cósmico!",imagem:13},
  {id:14,nome:"Brownie Buraco Negro",preco:18.90,categoria:"sobremesas",descricao:"Brownies macios e chocolatudos, acompanhados de uma calda cremosa de chocolate. Uma tentação de gravidade irresistível!",imagem:14},
  {id:15,nome:"Cookies Nebulosa de Nutella",preco:19.90,categoria:"sobremesas",descricao:"Cookies douradinhos recheados com Nutella, acompanhados de um potinho extra para mergulhar cada mordida em puro sabor!",imagem:15},
  {id:16,nome:"Trio Gelado da Galáxia",preco:23.90,categoria:"sobremesas",descricao:"Três bolas de sorvete nos sabores chocolate, creme e morango, finalizadas com biscoitinhos crocantes. Uma viagem refrescante pelo universo!",imagem:16},
  {id:17,nome:"Eclipse de Nutella (FATIA)",preco:19.90,categoria:"sobremesas",descricao:"Uma fatia generosa de torta cookie, crocante por fora, macia por dentro e recheada com Nutella cremosa. Uma explosão de chocolate a cada mordida!",imagem:17},
  {id:18,nome:"Eclipse de Nutella",preco:58.90,categoria:"sobremesas",descricao:"Torta cookie inteira, crocante por fora, recheada com Nutella cremosa e coberta com pedaços de chocolate e uma deliciosa calda. Um eclipse de sabor!",imagem:18},
  {id:19,nome:"Calabresa de Marte (35 CM)",preco:35.90,categoria:"pizza",descricao:"Calabresa fatiada, queijo derretido e molho de tomate. Uma explosão de sabor!",imagem:19},
  {id:20,nome:"Lua de Mussarela (35 CM)",preco:31.90,categoria:"pizza",descricao:"Mussarela derretida sobre molho de tomate e massa crocante. Simplesmente celestial!",imagem:20},
  {id:21,nome:"Nebulosa Cremosa (35 CM)",preco:37.90,categoria:"pizza",descricao:"Frango desfiado, catupiry cremoso e queijo derretido. Uma galáxia de cremosidade!",imagem:21},
  {id:22,nome:"Galáxia Portuguesa (35 CM)",preco:39.90,categoria:"pizza",descricao:"Presunto, ovos, cebola, azeitonas, mussarela e muito sabor em uma só órbita!",imagem:22},
  {id:23,nome:"Supernova Colorida (30 CM)",preco:26.90,categoria:"pizza",descricao:"Chocolate cremoso coberto com confetes coloridos. Uma explosão doce de alegria!",imagem:23},
  {id:24,nome:"Bananas Estelares (30 CM)",preco:25.90,categoria:"pizza",descricao:"Bananas macias polvilhadas com açúcar e canela. Uma combinação de outro planeta!",imagem:24},
  {id:25,nome:"Via Láctea de Morango (30 CM)",preco:29.90,categoria:"pizza",descricao:"Chocolate cremoso com morangos frescos. Uma viagem irresistível pelo universo doce!",imagem:25},
  {id:26,nome:"Refrigerante Estelar",preco:8.90,categoria:"bebidas",descricao:"Refrigerante geladinho no copo oficial da Mega Lanchonete Espacial.",imagem:26},
  {id:27,nome:"Suco Nebulosa",preco:7.90,categoria:"bebidas",descricao:"Suco azul refrescante, com uma cor digna das galáxias.",imagem:27},
  {id:28,nome:"Milk-shake Buraco Negro",preco:14.90,categoria:"bebidas",descricao:"Milk-shake de Ovomaltine cremoso, com muito chocolate e crocância.",imagem:28},
  {id:29,nome:"Café Órbita",preco:7.90,categoria:"bebidas",descricao:"Café encorpado e aromático, servido no copo oficial da Mega Lanchonete Espacial.",imagem:29},
  {id:30,nome:"Chopeira de Júpiter",preco:124.90,categoria:"bebidas",descricao:"Barril retornável de chope Brahma, para uma experiência interplanetária.",imagem:30}
];
const orders = [];
function json(res,status,data){res.writeHead(status,{"Content-Type":"application/json; charset=utf-8","Cache-Control":"no-store"});res.end(JSON.stringify(data));}
function readBody(req){return new Promise((resolve,reject)=>{let body="";req.on("data",chunk=>{body+=chunk;if(body.length>100000)reject(new Error("Pedido muito grande."));});req.on("end",()=>{try{resolve(JSON.parse(body||"{}"));}catch{reject(new Error("JSON inválido."));}});req.on("error",reject);});}
function staticFile(res,pathname){
  let decoded;try{decoded=decodeURIComponent(pathname);}catch{return json(res,400,{erro:"Endereço inválido."});}
  const publicPath=decoded==="/"?"/index.html":decoded;
  if(publicPath!=="/index.html"&&publicPath!=="/style.css"&&!/^\/imagens\/lanche-\d{2}\.jpg$/.test(publicPath))return json(res,404,{erro:"Arquivo não encontrado."});
  const file=path.resolve(ROOT,"."+publicPath);
  if(!file.startsWith(ROOT+path.sep))return json(res,403,{erro:"Acesso negado."});
  fs.readFile(file,(error,data)=>{if(error)return json(res,404,{erro:"Arquivo não encontrado."});const ext=path.extname(file).toLowerCase();const types={".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".jpg":"image/jpeg"};res.writeHead(200,{"Content-Type":types[ext]||"application/octet-stream"});res.end(data);});
}
const server=http.createServer(async(req,res)=>{
  const url=new URL(req.url,"http://localhost");
  if(req.method==="GET"&&url.pathname==="/api/produtos")return json(res,200,products);
  if(req.method==="POST"&&url.pathname==="/api/pedidos"){
    try{const body=await readBody(req);if(!Array.isArray(body.itens)||body.itens.length<1||body.itens.length>100)return json(res,400,{erro:"Envie entre 1 e 100 itens."});const items=body.itens.map(id=>products.find(p=>p.id===Number(id)));if(items.some(p=>!p))return json(res,400,{erro:"O pedido contém um produto inválido."});const order={id:randomUUID(),itens:items.map(({id,nome,preco})=>({id,nome,preco})),total:Number(items.reduce((sum,p)=>sum+p.preco,0).toFixed(2)),criadoEm:new Date().toISOString(),status:"recebido (demonstração)"};orders.push(order);return json(res,201,order);}catch(error){return json(res,400,{erro:error.message||"Pedido inválido."});}
  }
  if(req.method==="GET"&&url.pathname==="/api/pedidos")return json(res,200,orders);
  if(url.pathname.startsWith("/api/"))return json(res,404,{erro:"Rota da API não encontrada."});
  if(req.method==="GET")return staticFile(res,url.pathname);
  return json(res,405,{erro:"Método não permitido."});
});
server.listen(PORT,"0.0.0.0",()=>console.log("Mega Lanchonete disponível na porta "+PORT));
