const { expect} = require("chai");
const { ethers } = require("hardhat");
const chai= require("chai");
const should = chai.should();


describe("ERC20FixedSupply", function(){
    beforeEach(async function(){
        [owner,add1,add2,...addrs] = await ethers.getSigners();
        const ERC20FixedSupply = await ethers.getContractFactory("ERC20FixedSupply");
        Erctoken = await ERC20FixedSupply.deploy();
        await Erctoken.deployed();
    })
    it("Contract is Deployed?", async function(){
        console.log("Yes Contract is Deployed Successfully!");
    })
    describe("Deployment", function(){
        it("should set right owner of contract", async function(){
            const balanceSupply= await Erctoken.balanceOf(owner.address);
           expect(await Erctoken.tokenSupply()).to.equal(balanceSupply);
           console.log("Contract owner is",owner.address);
           console.log("total Supply is", await Erctoken.tokenSupply());
           console.log("balance of Owner is",balanceSupply);
        })
        it("This should return balance of owner ", async function() {
            const BalanceOfOwner = await Erctoken.balanceOf(owner.address);
            console.log("Owner Balance= ", BalanceOfOwner);
        })
        it("it should return Total supply", async function(){
            const Tokensupply = await Erctoken.tokenSupply();
            expect(Tokensupply.toString()).to.equal("100000000000000");
            console.log("Token Supply= ", Tokensupply);
        }) 
        it("it should return the name of token", async function(){
            const Name = await Erctoken.tokenName();
            expect(Name).to.equal("ShahidKhanNiazi");
            console.log("Token Name= ", Name);
        })
        it("it should return the tokensymbol of token", async function(){
            const Symbol = await Erctoken.tokenSymbol()
            expect(Symbol).to.equal("SKN");
            console.log("Token symbol= ", Symbol);
        })
        it("it should return the token decimals", async function(){
            const Decimal = await Erctoken.tokenDecimal();
            expect(Decimal).to.equal(10);
            console.log("Token decimal= ", Decimal);
        })  
    })
    describe("Check balance before sending" ,function(){
        it("Should fail if the balance is not enough", async function(){
        const initialBalOwner= await Erctoken.balanceOf(owner.address);
        console.log(await Erctoken.balanceOf(add1.address));
        await Erctoken.connect(add1).transfer(owner.address,3).should.be.revertedWith("You have not sufficent tokens");
        expect(await Erctoken.balanceOf(owner.address)).to.equal(initialBalOwner);
    
        })
    })
    describe("Transfer" ,function(){
        it("This should transfer tokens from owner to add1", async function(){
        const initialBalOwner= await Erctoken.balanceOf(owner.address);
        console.log("owner balance before transfer",initialBalOwner);
        await Erctoken.transfer(add1.address,50);
        const finalBalOwner=await Erctoken.balanceOf(owner.address);
        expect(finalBalOwner===(initialBalOwner-50));
        console.log("owner balance  after transferred to add1",finalBalOwner);
        expect(await Erctoken.balanceOf(add1.address)).to.equal(50);
        console.log("Add1 balance is", await Erctoken.balanceOf(add1.address));
        })
    })
    describe("Approve ", function(){
        it("this should approve number tokens to the delegate ", async function(){
            const approveTokens = 50;
            await Erctoken.approve(add1.address, approveTokens);
            console.log(await Erctoken.allowance(owner.address,add1.address));
            expect(await Erctoken.allowance(owner.address,add1.address)).to.equal(50);
            console.log("Number of tokens approved= ", approveTokens);
        })
    })
    describe("Transferfrom", function (){
        it("This should transfer tokens from add1 to add2", async function (){
            const NumOfToken=50;
            await Erctoken.approve(add1.address,NumOfToken);
            const TransferToken=10;
            console.log("owner balance before transfer=", await Erctoken.balanceOf(owner.address));
            await Erctoken.connect(add1).transferFrom(owner.address, add2.address, TransferToken);
            expect(await Erctoken.balanceOf(add2.address)).to.equal(10);
            console.log("owner balance after transfer", await Erctoken.balanceOf(owner.address));
        })
    })
    describe("Allowance",function(){
        it("show allowance of the approved Address", async function (){
            await Erctoken.approve(add1.address,7);
            const spenderBal= await Erctoken.connect(add1).allowance(owner.address,add1.address);
            expect(spenderBal).to.equal(7);


        })

    })
})

    